#!/usr/bin/env python3
"""Edit copy on the student flier, in the finished PDF.

The student flier has no generator in this repo: `MV-Science-Fair-Flier.pdf` is
a ReportLab artefact from 2026-08-04 whose source did not survive the session
that produced it. Rebuilding it from a photograph would be guesswork, so this
edits the finished PDF instead, touching only the operators it is asked to and
leaving the other ~1300 byte for byte alone.

Both subcommands hit the same wall: the flier's embedded JetBrains Mono is
subset down to exactly the glyphs its original strings needed, so it has no
"1", no "3", no ":", no "&" and no middot. Each rewritten run therefore gets a
fresh full-coverage subset of its own, and the flier's own subsets are left in
place for everything that has not changed.

Geometry and type specs are read back out of the PDF rather than hardcoded, so
this stays correct after it has been run once.

    cd fliers/src
    uv run --with pikepdf --with reportlab --with pymupdf python patch-flier.py \
        pill "CLOSES SUNDAY, SEPT 13 · 11:59 PM"

    uv run --with pikepdf --with reportlab --with pymupdf python patch-flier.py \
        footer "A student-led event organized by the MVHS STEM & Research Club." \
               "Not affiliated with or endorsed by MVWSD."

Verify what comes out:

    pdftotext ../MV-Science-Fair-Flier.pdf - | tail -5
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
FONT_URL = "https://github.com/JetBrains/JetBrainsMono/raw/master/fonts/ttf/{}"
FONTS = {  # reportlab name -> (file, pdf resource name to write into the page)
    "JBM-Bold": ("JetBrainsMono-Bold.ttf", "/FD1"),
    "JBM-Regular": ("JetBrainsMono-Regular.ttf", "/FD2"),
}

# The coral pill fill, as ReportLab wrote it. Also DESIGN.md's --coral #D96C4F.
CORAL = rb"\.88146 \.417096 \.234463 rg"

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

# The left half of the footer, below the hairline at y=74. Matched on its lead
# words so it survives being rewritten into two lines.
FOOTER = re.compile(
    rb"(?P<text>BT 1 0 0 1 0 0 Tm "
    rb"1 0 0 1 (?P<tx>[-.\d]+) (?P<ty>[-.\d]+) Tm "
    rb"(?P<rg>[-.\d]+ [-.\d]+ [-.\d]+ rg) (?P<tc>[-.\d]+) Tc "
    rb"(?P<font>/[^\s]+) (?P<size>[-.\d]+) Tf (?P<tl>[-.\d]+) TL "
    rb"(?P<string>\((?:A student-led|Organized by)(?:[^()\\]|\\.)*\)) Tj ET)"
    # A second line may already be there from a previous run; take it too. It is
    # identified by starting at the same x, which the right-hand event stamp on
    # the same baseline does not: without that backreference this swallows the
    # stamp and silently deletes it.
    rb"(?P<extra>(?:\nBT 1 0 0 1 0 0 Tm 1 0 0 1 (?P=tx) [-.\d]+ Tm [^\n]*?"
    rb"\((?:[^()\\]|\\.)*\) Tj ET)*)"
)

K = 0.5528  # the circle-to-bezier constant the original path was built with


def num(v: float) -> bytes:
    """Format like ReportLab does: trimmed, no exponent."""
    return f"{round(v, 4):g}".encode()


def ensure_font(name: str) -> Path:
    filename, _ = FONTS[name]
    path = HERE / "fonts" / filename
    if not path.exists():
        path.parent.mkdir(parents=True, exist_ok=True)
        with urllib.request.urlopen(FONT_URL.format(filename), timeout=60) as r:
            path.write_bytes(r.read())
    return path


def encode(texts: list[str], size: float, font: str):
    """Return each string's Tj operand bytes, plus the font object to embed.

    ReportLab subsets TrueType fonts and remaps characters onto its own codes,
    so the bytes that belong in the content stream have to be read back out of
    a throwaway document rather than assumed to be ASCII. All the strings are
    drawn into one document so they share a single subset.
    """
    pdfmetrics.registerFont(TTFont(font, str(ensure_font(font))))
    buf = io.BytesIO()
    c = canvas.Canvas(buf, pagesize=(612, 792))
    c.setFont(font, size)
    for i, t in enumerate(texts):
        c.drawString(0, 700 - i * 20, t)
    c.save()
    buf.seek(0)

    mini = pikepdf.open(buf)
    stream = mini.pages[0].Contents.read_bytes()
    found = [m.group(0)[: m.group(0).rindex(b")") + 1]
             for m in re.finditer(rb"\((?:[^()\\]|\\.)*\)\s*Tj", stream)]
    if len(found) != len(texts):
        raise SystemExit(f"expected {len(texts)} Tj operands, found {len(found)}")

    # ReportLab always declares Helvetica as /F1 whether or not it is used, so
    # pick the subset by BaseFont rather than by position.
    subsets = [v for v in mini.pages[0].Resources.Font.values()
               if "JetBrainsMono" in str(v.get("/BaseFont", ""))]
    if len(subsets) != 1:
        raise SystemExit(f"expected one JetBrains Mono subset, found {len(subsets)}")
    return found, subsets[0], mini


def rounded_rect(x0: float, y0: float, x1: float, y1: float, r: float) -> bytes:
    """The same path shape ReportLab emitted, at new coordinates."""
    n = lambda v: num(v).decode()  # noqa: E731
    return "\n".join([
        f"{n(x0 + r)} {n(y0)} m",
        f"{n(x1 - r)} {n(y0)} l",
        f"{n(x1 - r + r * K)} {n(y0)} {n(x1)} {n(y0 + r - r * K)} {n(x1)} {n(y0 + r)} c",
        f"{n(x1)} {n(y1 - r)} l",
        f"{n(x1)} {n(y1 - r + r * K)} {n(x1 - r + r * K)} {n(y1)} {n(x1 - r)} {n(y1)} c",
        f"{n(x0 + r)} {n(y1)} l",
        f"{n(x0 + r - r * K)} {n(y1)} {n(x0)} {n(y1 - r + r * K)} {n(x0)} {n(y0 + r)} c",
        f"{n(x0)} {n(y0 + r)} l",
        f"{n(x0)} {n(y0 + r - r * K)} {n(x0 + r - r * K)} {n(y0)} {n(x0 + r)} {n(y0)} c",
        "h", "f*",
    ]).encode()


def only_match(pattern, data, what):
    hits = list(pattern.finditer(data))
    if len(hits) != 1:
        raise SystemExit(f"expected exactly one {what}, matched {len(hits)}")
    return hits[0]


def do_pill(pdf, data, text):
    m = only_match(PILL, data, "deadline pill")

    # A rounded rect's extremes are its corners, whichever operator wrote them.
    coords = [float(v) for v in re.findall(rb"[-.\d]+", m.group("path"))]
    xs, ys = coords[0::2], coords[1::2]
    x0, x1, y0, y1 = min(xs), max(xs), min(ys), max(ys)
    radius = coords[0] - x0  # the path's first point is one radius in

    tx = float(m.group("tx"))
    size, tc = float(m.group("size")), float(m.group("tc"))
    pad = tx - x0  # reuse the original left padding on both sides

    (encoded,), font_obj, _keep = encode([text], size, "JBM-Bold")
    # Trailing character spacing is ink-free, so it must not pad the pill.
    width = pdfmetrics.stringWidth(text, "JBM-Bold", size) + tc * (len(text) - 1)
    new_x1 = round(tx + width + pad, 4)

    new_text = (m.group("text")
                .replace(m.group("font") + b" ", FONTS["JBM-Bold"][1].encode() + b" ", 1)
                .replace(m.group("string"), encoded, 1))
    patched = (data[:m.start()]
               + CORAL.replace(b"\\", b"") + b"\nn\n"
               + rounded_rect(x0, y0, new_x1, y1, radius) + b"\n"
               + new_text
               + data[m.end():])

    pdf.pages[0].Resources.Font[FONTS["JBM-Bold"][1]] = pdf.copy_foreign(font_obj)
    print(f"pill   {text!r} ({len(text)} chars, {size:g}pt, {tc:g} Tc)")
    print(f"       {x0:g}..{new_x1:g} x {y0:g}..{y1:g}  (was {x0:g}..{x1:g})")
    return patched


def do_footer(pdf, data, lines):
    m = only_match(FOOTER, data, "left footer line")
    tx, ty = float(m.group("tx")), float(m.group("ty"))
    size, tl = float(m.group("size")), float(m.group("tl"))
    rg, tc = m.group("rg"), m.group("tc")

    encoded, font_obj, _keep = encode(lines, size, "JBM-Regular")
    fd = FONTS["JBM-Regular"][1].encode()
    ops = b"\n".join(
        b"BT 1 0 0 1 0 0 Tm 1 0 0 1 " + num(tx) + b" " + num(ty - i * (tl + 1))
        + b" Tm " + rg + b" " + tc + b" Tc " + fd + b" " + num(size)
        + b" Tf " + num(tl) + b" TL " + e + b" Tj ET"
        for i, e in enumerate(encoded)
    )
    patched = data[:m.start()] + ops + data[m.end():]

    pdf.pages[0].Resources.Font[FONTS["JBM-Regular"][1]] = pdf.copy_foreign(font_obj)
    for i, line in enumerate(lines):
        w = pdfmetrics.stringWidth(line, "JBM-Regular", size)
        print(f"footer y={ty - i * (tl + 1):g}  {tx:g}..{tx + w:.1f}  {line!r}")
    return patched


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--in", dest="src", type=Path, default=DEFAULT_PDF)
    ap.add_argument("--out", dest="dst", type=Path, default=None)
    sub = ap.add_subparsers(dest="what", required=True)
    p = sub.add_parser("pill", help="the orange deadline chip")
    p.add_argument("text", help='e.g. "CLOSES SUNDAY, SEPT 13 · 11:59 PM"')
    f = sub.add_parser("footer", help="the left footer, one argument per line")
    f.add_argument("lines", nargs="+")
    args = ap.parse_args()

    # In place is the normal case here, and pikepdf refuses it unless told.
    pdf = pikepdf.open(args.src, allow_overwriting_input=True)
    data = pdf.pages[0].Contents.read_bytes()
    data = (do_pill(pdf, data, args.text) if args.what == "pill"
            else do_footer(pdf, data, args.lines))
    pdf.pages[0].Contents = pdf.make_stream(data)
    dst = args.dst or args.src
    pdf.save(dst)
    print(f"wrote  {dst}")


if __name__ == "__main__":
    main()
