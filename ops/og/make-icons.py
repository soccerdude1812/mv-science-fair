#!/usr/bin/env python3
"""Turn the 512x512 site mark into the three icon files Next serves.

    node ops/og/build-og.mjs
    # screenshot ops/og/icon.html at 512x512 -> ops/og/icon-512.png
    python3 ops/og/make-icons.py ops/og/icon-512.png

Writes src/app/icon.png (512, the rel=icon Next emits), src/app/apple-icon.png
(180, the iOS home screen tile, opaque because iOS composites onto black) and
src/app/favicon.ico (16/32/48, for anything that asks for /favicon.ico without
reading the markup first, which includes several link scrapers).
"""

import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
APP = ROOT / "src" / "app"


def main(src: str) -> None:
    img = Image.open(src).convert("RGB")
    if img.size != (512, 512):
        img = img.resize((512, 512), Image.LANCZOS)

    img.save(APP / "icon.png", optimize=True)
    img.resize((180, 180), Image.LANCZOS).save(APP / "apple-icon.png", optimize=True)
    # RGBA, not RGB. Pillow embeds PNGs inside the .ico in whatever mode it is
    # handed, and Next 16's Turbopack build decodes the file at build time and
    # fails outright on an RGB one: "Format error decoding Ico: The PNG is not
    # in RGBA format!". The mark is opaque either way; this only sets the mode.
    img.convert("RGBA").save(APP / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

    for name in ("icon.png", "apple-icon.png", "favicon.ico"):
        print(f"wrote {APP / name}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else str(Path(__file__).parent / "icon-512.png"))
