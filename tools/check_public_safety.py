#!/usr/bin/env python3
"""Guard public docs against common credentials and private-resource file leaks.

This is a lightweight repository hygiene check, not a comprehensive secret scan.
"""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
SKIP_DIRS = {".git", "node_modules", "dist", "cache", "__pycache__"}
SAFE_EXTENSIONS = {".md", ".mts", ".ts", ".css", ".json", ".yml", ".yaml", ".py", ".txt"}
BLOCKED_SUFFIXES = {".pem", ".p12", ".pfx", ".key", ".env", ".sql", ".db", ".sqlite", ".zip", ".rar", ".7z"}
ALLOWED_LUA_EXAMPLES = set()  # A public docs repo should never distribute private Lua scripts.

PATTERNS = {
    "private key block": re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----"),
    "GitHub token": re.compile(r"gh[pousr]_[A-Za-z0-9_]{25,}"),
    "GitHub fine-grained token": re.compile(r"github_pat_[A-Za-z0-9_]{25,}"),
    "Discord webhook": re.compile(r"https?://(?:canary\.|ptb\.)?discord(?:app)?\.com/api/webhooks/\d+/[A-Za-z0-9_-]{20,}"),
    "AWS access key": re.compile(r"AKIA[0-9A-Z]{16}"),
    "FiveM license key assignment": re.compile(r"(?im)^\s*sv_licenseKey\s+[A-Za-z0-9]{20,}\b"),
    "credential assignment": re.compile(r"(?im)^\s*(?:password|api_key|auth_token|access_token|client_secret)\s*[:=]\s*['\"][^'\"]{12,}['\"]\s*$"),
}

failures = []
checked = 0
for path in ROOT.rglob("*"):
    if not path.is_file() or any(part in SKIP_DIRS for part in path.relative_to(ROOT).parts):
        continue
    rel = path.relative_to(ROOT)
    low = path.name.lower()
    if path.suffix.lower() in BLOCKED_SUFFIXES or low in {".env.local", ".env.production", "server.cfg", "database.cfg"}:
        failures.append(f"{rel}: restricted file type or configuration")
        continue
    if path.suffix.lower() == ".lua" and str(rel) not in ALLOWED_LUA_EXAMPLES:
        failures.append(f"{rel}: Lua source must stay outside public docs")
        continue
    if path.suffix.lower() not in SAFE_EXTENSIONS and low not in {".gitignore", "codeowners"}:
        # Binary assets must be deliberately approved before committing to public docs.
        failures.append(f"{rel}: file format not allowlisted for public documentation")
        continue
    content = path.read_text(encoding="utf-8", errors="replace")
    checked += 1
    for name, pattern in PATTERNS.items():
        if pattern.search(content):
            failures.append(f"{rel}: possible {name}; inspect privately")

if failures:
    print("\n".join(failures), file=sys.stderr)
    print(f"Public documentation safety check failed ({len(failures)} finding(s)).", file=sys.stderr)
    sys.exit(1)
print(f"Public documentation safety check passed across {checked} text files.")
