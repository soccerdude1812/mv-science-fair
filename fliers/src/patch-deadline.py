#!/usr/bin/env python3
"""Rewrite the deadline pill on the student flier.

The student flier has no generator in this repo: `MV-Science-Fair-Flier.pdf` is
a ReportLab artefact from 2026-08-04 whose source did not survive the session
that produced it. Rebuilding it from a photograph would be guesswork, so this
edits the finished PDF instead, touching only the deadline pill and leaving the
other ~1300 content-stream operators byte for byte alone.

Two things move together: the rounded rect, which is sized to its text, and the
text itself. The flier's own JetBrains Mono Bold is subset down to exactly the
glyphs the original pill string needed, so it has no "1", no "3", no ":" and no
middot. A fresh full-coverage subset is embedded for the pill alone.

Both the geometry and the type spec are read back out of the PDF rather than
hardcoded, so this stays correct after it has been run once.

    cd fliers/src
    uv run --with pikepdf --with reportlab --with pymupdf \
        python patch-deadline.py "CLOSES SUNDAY, SEPT 13 · 11:59 PM"

Pass an explicit input and output with --in / --out. Verify what comes out:

    pdftotext ../MV-Science-Fair-Flier.pdf - | grep CLOSES
"""
from __future__ import annotations

import argparse
import io
import re
import urllib.request
from pathlib import Path

import pikepdf
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

HERE = Path(__file__).resolve().parent
DEFAULT_PDF = HERE.parent / "MV-Science-Fair-Flier.pdf"
FONT_PATH = HERE / "fonts" / "JetBrainsMono-Bold.ttf"
FONT_URL = (
    "https://github.com/JetBrains/JetBrainsMono/raw/master/fonts/ttf/"
    "JetBrainsMono-Bold.ttf"
)

# The coral pill fill, as ReportLab wrote it. Also DESIGN.md's --coral #D96C4F.
CORAL = rb"\.88146 \.417096 \.234463 rg"
# A PDF string literal: no bare parens, backslash escapes allowed.
PDF_STRING = rb"\((?:[^()\\]|\\.)*\)"

PILL = re.compile(
    CORAL + rb"\nn\n"
    rb"(?P<path>(?:[-.\d]+[^\n]*\n)+?h\nf\*)\n"
    # ReportLab writes an identity Tm and then the real one. Both are matched so
    # the placement is read off the second, not the identity that precedes it.
    rb"(?P<text>BT 1 0 0 1 0 0 Tm "
    rb"1 0 0 1 (?P<tx>[-.\d]+) (?P<ty>[-.\d]+) Tm"
    rb"[^\n]*?(?P<tc>[-.\d]+) Tc "
    rb"(?P<font>/[^\s]+) (?P<size>[-.\d]+) Tf"
    # Anchored on the copy itself: the coral fill also paints the three column
    # rules, and their labels sit in the same shape of text operator.
    rb"[^\n]*?(?P<string>\(CLOSES(?:[^()\\]|\\.)*\)) Tj ET)"
)

# The circle-to-bezier constant the original path was built with.
K = 0.5528


def num(v: float) -> bytes:
    """Format like ReportLab does: trimmed, no exponent."""
    return f"{round(v, 4):g}".encode()


def ensure_font() -> Path:
    if not FONT_PATH.exists():
        FONT_PATH.parent.mkdir(parents=True, exist_ok=True)
        with urllib.request.urlopen(FONT_URL, timeout=60) as r:
            FONT_PATH.write_bytes(r.read())
    return FONT_PATH


def encode_with_font(text: str, size: float) -> tuple[bytes, object, object]:
    """Return the Tj operand bytes plus the font object to embed.

    ReportLab subsets TrueType fonts and remaps characters onto its own codes,
    so the bytes that belong in the content stream have to be read back out of
    a throwaway document rather than assumed to be ASCII.
    """
    pdfmetrics.registerFont(TTFont("JBM-Bold", str(ensure_font())))
    buf = io.BytesIO()
    c = canvas.Canvas(buf, pagesize=(612, 792))
    c.setFont("JBM-Bold", size)
    c.drawString(0, 0, text)
    c.save()
    buf.seek(0)

    mini = pikepdf.open(buf)
    stream = mini.pages[0].Contents.read_bytes()
    m = re.search(PDF_STRING + rb"\s*Tj", stream)
    if not m:
        raise SystemExit("no Tj operand in the throwaway document")
    encoded = m.group(0)[: m.group(0).rindex(b")") + 1]

    # ReportLab always declares Helvetica as /F1 whether or not it is used, so
    # pick the subset by BaseFont rather than by position.
    fonts = [v for v in mini.pages[0].Resources.Font.values()
             if "JetBrainsMono" in str(v.get("/BaseFont", ""))]
    if len(fonts) != 1:
        raise SystemExit(f"expected one JetBrains Mono subset, found {len(fonts)}")
    return encoded, fonts[0], mini


def rounded_rect(x0: float, y0: float, x1: float, y1: float, r: float) -> bytes:
    """The same path shape ReportLab emitted, at new coordinates."""
    p = [
        f"{num(x0 + r).decode()} {num(y0).decode()} m",
        f"{num(x1 - r).decode()} {num(y0).decode()} l",
        f"{num(x1 - r + r * K).decode()} {num(y0).decode()} "
        f"{num(x1).decode()} {num(y0 + r - r * K).decode()} "
        f"{num(x1).decode()} {num(y0 + r).decode()} c",
        f"{num(x1).decode()} {num(y1 - r).decode()} l",
        f"{num(x1).decode()} {num(y1 - r + r * K).decode()} "
        f"{num(x1 - r + r * K).decode()} {num(y1).decode()} "
        f"{num(x1 - r).decode()} {num(y1).decode()} c",
        f"{num(x0 + r).decode()} {num(y1).decode()} l",
        f"{num(x0 + r - r * K).decode()} {num(y1).decode()} "
        f"{num(x0).decode()} {num(y1 - r + r * K).decode()} "
        f"{num(x0).decode()} {num(y0 + r).decode()} c",
        f"{num(x0).decode()} {num(y0 + r).decode()} l",
        f"{num(x0).decode()} {num(y0 + r - r * K).decode()} "
        f"{num(x0 + r - r * K).decode()} {num(y0).decode()} "
        f"{num(x0 + r).decode()} {num(y0).decode()} c",
        "h",
        "f*",
    ]
    return "\n".join(p).encode()


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("text", help='new pill text, e.g. "CLOSES SUNDAY, SEPT 13 · 11:59 PM"')
    ap.add_argument("--in", dest="src", type=Path, default=DEFAULT_PDF)
    ap.add_argument("--out", dest="dst", type=Path, default=None)
    args = ap.parse_args()
    dst = args.dst or args.src

    pdf = pikepdf.open(args.src)
    page = pdf.pages[0]
    data = page.Contents.read_bytes()

    hits = PILL.findall(data)
    if len(hits) != 1:
        raise SystemExit(f"expected exactly one deadline pill, matched {len(hits)}")
    m = PILL.search(data)

    # A rounded rect's extremes are its corners, whichever operator wrote them.
    coords = [float(v) for v in re.findall(rb"[-.\d]+", m.group("path"))]
    xs, ys = coords[0::2], coords[1::2]
    x0, x1, y0, y1 = min(xs), max(xs), min(ys), max(ys)
    # The first point of the path sits one radius in from the left edge.
    radius = coords[0] - x0

    tx, ty = float(m.group("tx")), float(m.group("ty"))
    size, tc = float(m.group("size")), float(m.group("tc"))
    pad = tx - x0  # reuse the original left padding on both sides

    encoded, font_obj, _mini = encode_with_font(args.text, size)
    # Trailing character spacing is ink-free, so it must not pad the pill.
    width = pdfmetrics.stringWidth(args.text, "JBM-Bold", size) + tc * (len(args.text) - 1)
    new_x1 = round(tx + width + pad, 4)

    old_text = m.group("text")
    new_text = (old_text
                .replace(m.group("font") + b" ", b"/FD1 ", 1)
                .replace(m.group("string"), encoded, 1))

    patched = (data[:m.start()]
               + CORAL.replace(b"\\", b"") + b"\nn\n"
               + rounded_rect(x0, y0, new_x1, y1, radius) + b"\n"
               + new_text
               + data[m.end():])

    page.Resources.Font["/FD1"] = pdf.copy_foreign(font_obj)
    page.Contents = pdf.make_stream(patched)
    pdf.save(dst)

    print(f"text   {args.text!r} ({len(args.text)} chars, {size}pt, {tc} Tc)")
    print(f"pill   {x0:g}..{new_x1:g} x {y0:g}..{y1:g}  (was {x0:g}..{x1:g})")
    print(f"wrote  {dst}")


if __name__ == "__main__":
    main()
