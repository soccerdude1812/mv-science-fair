#!/bin/zsh
# Render the four Instagram artefacts with headless Chrome. Deterministic and
# offline: the HTML has its fonts and QR codes inlined, so nothing here touches
# the network.
#
#   MV-Science-Fair-IG-Mentor.png          1080x1350  feed post, 4:5
#   MV-Science-Fair-IG-Mentor-Story.png    1080x1920  story, 9:16
#   MV-Science-Fair-IG-EventDay.png        1080x1350
#   MV-Science-Fair-IG-EventDay-Story.png  1080x1920
#
# Each design is authored at its delivered pixel size, shot at 2x and
# downsampled back: the extra sample gives the serif display and the hairline
# strokes an antialiasing pass they do not get at device scale 1. The QR is
# re-decoded out of the final file by verify-qr.mjs afterwards to prove the
# resample did not cost it.
set -euo pipefail
cd "$(dirname "$0")"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT="out"
mkdir -p "$OUT"

node build-instagram.mjs

shoot() {  # <src html> <out png> <w> <h>
  "$CHROME" --headless --disable-gpu --hide-scrollbars --virtual-time-budget=6000 \
    --force-device-scale-factor=2 --window-size="$3,$4" \
    --screenshot="$2" "file://$PWD/$1" 2>/dev/null
  sips -z "$4" "$3" "$2" --out "$2" >/dev/null
}

shoot instagram-mentor.html         "$OUT/MV-Science-Fair-IG-Mentor.png"         1080 1350
shoot instagram-mentor-story.html   "$OUT/MV-Science-Fair-IG-Mentor-Story.png"   1080 1920
shoot instagram-eventday.html       "$OUT/MV-Science-Fair-IG-EventDay.png"       1080 1350
shoot instagram-eventday-story.html "$OUT/MV-Science-Fair-IG-EventDay-Story.png" 1080 1920

for f in "$OUT"/MV-Science-Fair-IG-*.png; do
  printf '%s  ' "$f"
  sips -g pixelWidth -g pixelHeight "$f" 2>/dev/null | awk '/pixel/{printf "%s ", $2}'
  printf '(%s bytes)\n' "$(stat -f%z "$f")"
done
