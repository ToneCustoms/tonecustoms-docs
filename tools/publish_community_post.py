#!/usr/bin/env python3
"""Publish owner-triggered, plain-text community posts into existing VitePress pages."""
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse
import os
import re

ROOT = Path(__file__).resolve().parents[1]
kind = os.environ["POST_TYPE"].strip()
title = os.environ["POST_TITLE"].strip()
category = os.environ["POST_CATEGORY"].strip()
message = os.environ["POST_MESSAGE"].strip()
link = os.environ.get("POST_LINK", "").strip()

ALLOWED = {
    "announcement": {"Community", "Website", "New release", "Script update", "Giveaway", "Support notice", "Partnership"},
    "insight": {"Concept", "In development", "Preview", "Released"},
}
if kind not in ALLOWED or category not in ALLOWED[kind]:
    raise SystemExit("Invalid post type/category combination.")
if not 3 <= len(title) <= 120 or not 5 <= len(message) <= 4000:
    raise SystemExit("Title must be 3–120 characters and message 5–4000 characters.")
if any(ord(c) < 32 and c not in "\n\t" for c in title + message):
    raise SystemExit("Invalid control characters.")
if link:
    parsed = urlparse(link)
    if parsed.scheme != "https" or not parsed.netloc or parsed.username or parsed.password or len(link) > 500:
        raise SystemExit("Link must be a valid public HTTPS URL.")

# Escape Markdown and HTML to ensure workflow inputs remain plain text, not arbitrary links or markup.
def plain(value):
    value = value.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    return re.sub(r"([\\`*_{}\[\]()#+.!|~-])", r"\\\1", value)

today = datetime.now(timezone.utc).strftime("%B %d, %Y")
heading = datetime.now(timezone.utc).strftime("%Y-%m-%d")
detail = f"## {heading} — {plain(title)}\n\n**Category / status:** {plain(category)}\n\n"
detail += "\n\n".join(plain(p.strip()) for p in message.split("\n\n") if p.strip()) + "\n\n"
if link:
    detail += f"**Official link:** {link}\n\n"

if kind == "announcement":
    file = ROOT / "ANNOUNCEMENTS.md"
    source = file.read_text(encoding="utf-8")
    anchor = "| --- | --- | --- |\n"
    if anchor not in source:
        raise SystemExit("Announcement table not found.")
    summary = plain(title).replace("\n", " ").replace("|", "&#124;")
    row = f"| {today} | {plain(category)} | {summary} |\n"
    source = source.replace(anchor, anchor + row, 1)
    marker = "## Announcement categories"
    if marker not in source:
        raise SystemExit("Announcement section missing.")
    source = source.replace(marker, detail + marker, 1)
else:
    file = ROOT / "INSIGHTS.md"
    source = file.read_text(encoding="utf-8")
    marker = "## Topics you'll see"
    if marker not in source:
        raise SystemExit("Insights section missing.")
    source = source.replace(
        "No developer insight posts have been published yet. This page is ready for owner-approved updates.\n\n", ""
    )
    source = source.replace(marker, detail + marker, 1)

file.write_text(source, encoding="utf-8")
print(f"Prepared {kind} post in {file.name}")
