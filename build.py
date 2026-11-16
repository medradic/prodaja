#!/usr/bin/env python3
"""Priprema statičnog sajta i ZIP paketa. Potreban je samo Python 3."""
from pathlib import Path
import shutil
from zipfile import ZipFile, ZIP_DEFLATED

ROOT = Path(__file__).resolve().parent
DIST = ROOT / "dist"
ARCHIVE = ROOT / "prodaja-final.zip"
WEB_FILES = ["index.html", "style.css", "script.js", ".nojekyll"]
ASSETS = [
    "assets/favicon.svg",
    "assets/fonts/yrsa-regular.woff2",
    "assets/fonts/yrsa-italic.woff2",
    "assets/fonts/OFL.txt",
    *[f"assets/{name}.{ext}" for name in
      ("bagrem", "livada", "propolis", "teglice", "poklopcici")
      for ext in ("png", "webp")],
]
SOURCE_FILES = WEB_FILES + ASSETS + ["build.py", "README.md", "PROVERA.md", ".gitignore"]


def build():
    # Eksplicitna lista sprečava uključivanje .git, .env, keševa i drugih podataka.
    for name in SOURCE_FILES:
        source = ROOT / name
        if not source.is_file() or source.is_symlink() or not source.resolve().is_relative_to(ROOT):
            raise SystemExit(f"Nedostaje ili nije običan projektni fajl: {name}")
    if DIST.is_symlink():
        raise SystemExit("dist ne sme biti simbolički link.")
    if DIST.exists():
        shutil.rmtree(DIST)
    for name in WEB_FILES + ASSETS:
        destination = DIST / name
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(ROOT / name, destination)
    if ARCHIVE.is_symlink():
        raise SystemExit("ZIP putanja ne sme biti simbolički link.")
    with ZipFile(ARCHIVE, "w", ZIP_DEFLATED) as archive:
        for name in SOURCE_FILES:
            archive.write(ROOT / name, f"prodaja-final/{name}")
    with ZipFile(ARCHIVE) as archive:
        if archive.testzip() is not None:
            raise SystemExit("ZIP provera nije prošla.")
    print(f"Produkcioni fajlovi: {DIST}")
    print(f"ZIP: {ARCHIVE} ({ARCHIVE.stat().st_size:,} bajtova)")


if __name__ == "__main__":
    build()
