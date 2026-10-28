#!/usr/bin/env python3
"""Check generated VitePress pages and high-value customer journeys."""
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / ".vitepress" / "dist"

ROUTES = [
    "/", "/ABOUT", "/products/", "/policies/", "/INSTALLATION", "/COMPATIBILITY",
    "/FAQ", "/SUPPORT", "/PURCHASE_AND_DELIVERY", "/UPDATE_GUIDE",
    "/products/gun-jam", "/products/gun-jam-installation",
    "/products/gun-jam-troubleshooting", "/products/gun-jam-changelog",
    "/products/family-system", "/products/family-system-installation",
    "/products/family-system-troubleshooting", "/products/family-system-changelog",
    "/products/window-cleaning", "/products/window-cleaning-installation",
    "/products/window-cleaning-troubleshooting", "/products/window-cleaning-changelog",
    "/products/free-resources", "/products/queue", "/products/farming",
    "/products/skills", "/products/roleplay-text", "/products/multi-job",
    "/products/pharmacy", "/products/inventory-images",
    "/ANNOUNCEMENTS", "/COMMUNITY", "/INSIGHTS", "/SCRIPT_UPDATES", "/FEATURES", "/CONTACT", "/START_HERE", "/CUSTOMER_CHECKLIST", "/CUSTOM_DEVELOPMENT",
    "/PARTNERSHIPS", "/PARTNERSHIP_AGREEMENT_TEMPLATE", "/RULES_AND_REGULATIONS",
    "/policies/UPDATES", "/policies/LICENSING",
    "/policies/CUSTOMER_SUPPORT", "/policies/PURCHASES_AND_REFUNDS",
    "/policies/SCRIPT_SWAPS", "/policies/PRIVACY",
]
missing = []
for route in ROUTES:
    path = route.lstrip("/")
    if not path or route.endswith("/"):
        candidates = [DIST / path / "index.html"]
    else:
        candidates = [DIST / (path + ".html"), DIST / path / "index.html"]
    if not any(p.is_file() and p.stat().st_size > 100 for p in candidates):
        missing.append(f"{route}: missing generated HTML ({', '.join(str(p.relative_to(DIST)) for p in candidates)})")

if missing:
    print("\n".join(missing), file=sys.stderr)
    sys.exit(1)

site_html = (DIST / "index.html").read_text(encoding="utf-8")
if "ToneCustoms" not in site_html:
    print("Generated homepage does not contain ToneCustoms branding", file=sys.stderr)
    sys.exit(1)
print(f"Verified {len(ROUTES)} generated VitePress routes and homepage branding.")
