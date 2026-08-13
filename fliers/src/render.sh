#!/bin/zsh
# Render both layouts with headless Chrome. Deterministic and offline: the HTML
# has its fonts and QR codes inlined, so nothing here touches the network.
set -euo pipefail
cd "$(dirname "$0")"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT="out"
mkdir -p "$OUT"

node build-flier.mjs

# 16:9 slide. Designed at 960x540 (the Google Slides canvas in CSS px), shot at
# 2x so it stays crisp when a projector or a zoomed slide upscales it.
"$CHROME" --headless --disable-gpu --hide-scrollbars --virtual-time-budget=6000 \
  --force-device-scale-factor=2 --window-size=960,540 \
  --screenshot="$OUT/MV-Science-Fair-Volunteer-Slide-16x9.png" \
  "file://$PWD/flier-slide.html" 2>/dev/null

# 8.5x11 print flier: a real PDF for the printer, plus a 2x PNG (1632x2112,
# ~192dpi) for anyone who would rather drop an image into a doc or a slide.
"$CHROME" --headless --disable-gpu --hide-scrollbars --virtual-time-budget=6000 \
  --no-pdf-header-footer --print-to-pdf-no-header \
  --print-to-pdf="$OUT/MV-Science-Fair-Volunteer-Flier.pdf" \
  "file://$PWD/flier-print.html" 2>/dev/null

"$CHROME" --headless --disable-gpu --hide-scrollbars --virtual-time-budget=6000 \
  --force-device-scale-factor=2 --window-size=816,1056 \
  --screenshot="$OUT/MV-Science-Fair-Volunteer-Flier.png" \
  "file://$PWD/flier-print.html" 2>/dev/null

for f in "$OUT"/*; do
  printf '%s  ' "$f"
  case "$f" in
    *.png) sips -g pixelWidth -g pixelHeight "$f" 2>/dev/null | awk '/pixel/{printf "%s ", $2}' ;;
    *.pdf) mdls -name kMDItemPageHeight -name kMDItemPageWidth "$f" 2>/dev/null | tr '\n' ' ' ;;
  esac
  printf '(%s bytes)\n' "$(stat -f%z "$f")"
done
