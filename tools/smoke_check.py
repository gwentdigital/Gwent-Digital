#!/usr/bin/env python3
"""Offline smoke checks for the static Gwent Digital website."""

from pathlib import Path
from urllib.parse import urlparse
import re
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
HTML_FILES = sorted(ROOT.glob("*.html")) + sorted((ROOT / "departments").glob("*.html"))
LOCAL_REF = re.compile(r"(?:href|src)=\"([^\"]+)\"")
SKIP_SCHEMES = ("http:", "https:", "mailto:", "tel:", "#", "data:", "javascript:")


def local_path(source: Path, reference: str):
    clean = reference.split("#", 1)[0].split("?", 1)[0]
    if not clean or clean.startswith(SKIP_SCHEMES):
        return None
    return (source.parent / clean).resolve()


def check_pages():
    failures = []
    for page in HTML_FILES:
        text = page.read_text(encoding="utf-8")
        if "<title>" not in text:
            failures.append(f"{page.relative_to(ROOT)}: missing title")
        for reference in LOCAL_REF.findall(text):
            target = local_path(page, reference)
            if target and not target.exists():
                failures.append(f"{page.relative_to(ROOT)} -> missing {reference}")
    return failures


def check_sitemap():
    failures = []
    sitemap = ROOT / "sitemap.xml"
    try:
        root = ET.fromstring(sitemap.read_text(encoding="utf-8"))
        urls = [node.text for node in root.iter() if node.tag.endswith("}loc")]
        for url in urls:
            path = urlparse(url).path.strip("/") or "index.html"
            target = ROOT / path
            if not target.exists():
                failures.append(f"sitemap -> missing {path}")
    except (OSError, ET.ParseError) as exc:
        failures.append(f"sitemap.xml: {exc}")
    return failures


def main():
    failures = check_pages() + check_sitemap()
    if failures:
        print("SMOKE CHECK FAILED")
        print("\n".join(f"- {failure}" for failure in failures))
        return 1
    print(f"SMOKE CHECK PASSED: {len(HTML_FILES)} HTML pages and sitemap links verified")
    return 0


if __name__ == "__main__":
    sys.exit(main())
