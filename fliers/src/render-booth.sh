#!/bin/zsh
# Render the four club-fair booth sheets with headless Chrome. Deterministic and
# offline: the HTML has its fonts and QR codes inlined, so nothing here touches
# the network.
#
# Each sheet renders three ways: the PDF that gets printed, a 2x PNG (what the
# QR verifier decodes and what a human eyeballs), and a tall shot of the
# overflow-visible check variant, which is the only thing that can catch content
# falling off the bottom of a fixed-height page.
set -euo pipefail
cd "$(dirname "$0")"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT="out"
mkdir -p "$OUT/tall"

node build-booth.mjs

typeset -A SHEETS
SHEETS=(
  booth-1-what     "MV-Science-Fair-Booth-1-What-It-Is"
  booth-2-why      "MV-Science-Fair-Booth-2-Why-Help"
  booth-3-fairday  "MV-Science-Fair-Booth-3-Fair-Day"
  booth-4-mentor   "MV-Science-Fair-Booth-4-Mentor"
)

shoot() {  # url out.png height
  "$CHROME" --headless --disable-gpu --hide-scrollbars --virtual-time-budget=6000 \
    --force-device-scale-factor=2 --window-size=816,"$3" \
    --screenshot="$2" "$1" 2>/dev/null
}

# the slugs are the SHEETS keys and nowhere else: a second list is a second
# thing to forget, and zsh expands a missing key to an empty filename rather
# than complaining
for src in ${(ko)SHEETS}; do
  name="${SHEETS[$src]}"
  [[ -n "$name" ]] || { echo "no output name for $src" >&2; exit 1; }
  "$CHROME" --headless --disable-gpu --hide-scrollbars --virtual-time-budget=6000 \
    --no-pdf-header-footer --print-to-pdf-no-header \
    --print-to-pdf="$OUT/$name.pdf" "file://$PWD/$src.html" 2>/dev/null
  # 816 x 1056 CSS px at 2x = 1632 x 2112, ~192dpi
  shoot "file://$PWD/$src.html" "$OUT/$name.png" 1056
  shoot "file://$PWD/$src.check.html" "$OUT/tall/$name.png" 1600
done

node check-fit.mjs "$OUT"/tall/*.png

# one four page file too: a booth poster is printed in one go, and four separate
# print dialogs is how a sheet gets left behind
if (( $+commands[pdfunite] )); then
  pdfunite "$OUT/MV-Science-Fair-Booth-1-What-It-Is.pdf" \
           "$OUT/MV-Science-Fair-Booth-2-Why-Help.pdf" \
           "$OUT/MV-Science-Fair-Booth-3-Fair-Day.pdf" \
           "$OUT/MV-Science-Fair-Booth-4-Mentor.pdf" \
           "$OUT/MV-Science-Fair-Booth-All-Four.pdf"
else
  echo "pdfunite not found (brew install poppler), skipping the combined file" >&2
fi

for f in "$OUT"/MV-Science-Fair-Booth-*.(pdf|png); do
  printf '%s  ' "$f"
  case "$f" in
    *.png) sips -g pixelWidth -g pixelHeight "$f" 2>/dev/null | awk '/pixel/{printf "%s ", $2}' ;;
    *.pdf) pdfinfo "$f" 2>/dev/null | awk '/Page size|Pages/{printf "%s ", $0}' ;;
  esac
  printf '(%s bytes)\n' "$(stat -f%z "$f")"
done
