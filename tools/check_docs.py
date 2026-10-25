#!/usr/bin/env python3
"""Validate repository-local Markdown links and image targets; no network access."""
from pathlib import Path
from urllib.parse import unquote, urlsplit
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
LINK_RE = re.compile(r"!?(?:\[[^\]]*\])\((<[^>]+>|[^\s)]+)(?:\s+[^)]*)?\)")
HTML_SRC_RE = re.compile(r"""(?:src|href)\s*=\s*["']([^"']+)["']""")
FENCE_RE = re.compile(r"^\s*[`~]{3,}")
SITE_BASE = "/tonecustoms-docs/"  # GitHub Pages project-site base path

failures = []
checked = 0
for md in sorted(ROOT.rglob("*.md")):
    if ".git" in md.parts:
        continue
    in_fence = False
    for number, line in enumerate(md.read_text(encoding="utf-8").splitlines(), 1):
        if FENCE_RE.match(line):
            in_fence = not in_fence
            continue
        if in_fence:
            continue
        for url in LINK_RE.findall(line) + HTML_SRC_RE.findall(line):
            url = url.strip("<>")
            parts = urlsplit(url)
            if parts.scheme or parts.netloc or url.startswith("#") or url.startswith("//") or url.startswith("mailto:"):
                continue
            if not parts.path:
                continue
            decoded_path = unquote(parts.path)
            if decoded_path.startswith(SITE_BASE):
                # VitePress cleanUrls links, written in custom HTML, use the deployed
                # GitHub Pages base and extensionless Markdown route names.
                target = ROOT / decoded_path[len(SITE_BASE):]
            elif url.startswith("/"):
                target = ROOT / decoded_path.lstrip("/")
            else:
                target = md.parent / decoded_path

            checked += 1
            if target.exists():
                continue

            # VitePress outputs /guide for guide.md and /section/ for section/index.md.
            # These are valid navigational URLs despite not being filesystem paths.
            alternatives = [Path(str(target) + ".md"), target / "index.md"]
            if any(candidate.is_file() for candidate in alternatives):
                continue

            failures.append(f"{md.relative_to(ROOT)}:{number}: missing local link target {url}")

if failures:
    print("\n".join(failures), file=sys.stderr)
    print(f"{len(failures)} broken local reference(s).", file=sys.stderr)
    raise SystemExit(1)
print(f"Checked {checked} local Markdown link target(s) successfully.")
