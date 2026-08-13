#!/bin/bash
# MV Science Fair sponsor bot, daily run.
#
# Order matters. Research first so the queue is full, then author copy for any
# row missing it, then send, then draft follow-ups. Every stage may fail without
# taking the others down: a day with no research is still a day that should send
# whatever is already verified and waiting.
set -uo pipefail

BOT="$HOME/mv-sponsor-bot"
PY="$BOT/.venv/bin/python"
CLAUDE="$HOME/.local/node/bin/claude"
export PATH="$HOME/.local/node/bin:$HOME/.local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"

CAP="${SPONSOR_CAP:-300}"
GAP="${SPONSOR_GAP:-15}"
DAY="$(date +%Y-%m-%d)"
LOG="$BOT/logs/$DAY.log"
mkdir -p "$BOT/logs"

say() { echo "[$(date '+%H:%M:%S')] $*" | tee -a "$LOG"; }

# macOS has no coreutils `timeout`. Kill only the child, never the process group:
# a group kill here would take down this script along with the stage it is bounding.
run_limited() {  # run_limited SECONDS cmd...
  local secs=$1; shift
  "$@" &
  local pid=$! i=0
  while kill -0 "$pid" 2>/dev/null && [ "$i" -lt "$secs" ]; do sleep 1; i=$((i + 1)); done
  if kill -0 "$pid" 2>/dev/null; then
    kill -TERM "$pid" 2>/dev/null
    sleep 5
    kill -KILL "$pid" 2>/dev/null
    return 124
  fi
  wait "$pid"
}

say "=== MV sponsor bot, $DAY, cap $CAP ==="
cd "$BOT" || exit 1

# Stop once the fair has happened. Nobody wants a sponsorship ask in October.
if [[ "$DAY" > "2026-09-27" ]]; then
  say "fair date has passed. Unloading myself so this does not run again."
  launchctl bootout "gui/$(id -u)/com.mvsciencefair.sponsorbot" 2>/dev/null
  exit 0
fi

say "--- inventory before ---"
$PY daily.py status 2>&1 | tee -a "$LOG"

CLAUDE_OK=0
if [ -x "$CLAUDE" ] && "$CLAUDE" -p "Reply with exactly: OK" >/dev/null 2>&1; then
  CLAUDE_OK=1
else
  say "WARNING: claude CLI is unavailable or not logged in."
  say "         Research and copywriting are skipped; sending still runs."
  say "         Fix with: ssh into this mac, run 'claude' and complete /login."
fi

# 1. Research, only when the queue is below the daily cap.
if $PY daily.py needs-research --cap "$CAP" >>"$LOG" 2>&1; then
  if [ "$CLAUDE_OK" = "1" ]; then
    say "inventory below cap, running research (90 min limit)"
    run_limited 5400 "$CLAUDE" -p "$(cat "$BOT/prompts/research.md")" \
      --permission-mode bypassPermissions >>"$LOG" 2>&1 \
      && say "research finished" || say "research failed or timed out, continuing"
  fi
else
  say "inventory already at or above cap, skipping research"
fi

# 2. Author personal lines for rows that have an address but no approved line.
NEED=$($PY daily.py needs-lines --cap "$CAP" 2>/dev/null | grep -c '"row"' || true)
if [ "${NEED:-0}" -gt 0 ] && [ "$CLAUDE_OK" = "1" ]; then
  say "$NEED rows need a personal line (60 min limit)"
  run_limited 3600 "$CLAUDE" -p "$(cat "$BOT/prompts/lines.md")" \
    --permission-mode bypassPermissions >>"$LOG" 2>&1 \
    && say "line authoring finished" || say "line authoring failed, continuing"
else
  say "no copywriting needed or claude unavailable ($NEED rows waiting)"
fi

# 3. Send. The only stage that talks to real businesses.
say "--- sending ---"
$PY daily.py send --cap "$CAP" --gap "$GAP" 2>&1 | tee -a "$LOG"
say "send exit ${PIPESTATUS[0]}"

# 4. Follow-ups: DRAFTS ONLY. Eeshan reviews and sends these by hand.
say "--- follow-up drafts (never sent) ---"
$PY daily.py followups --days 6 --cap 60 2>&1 | tee -a "$LOG"

say "--- inventory after ---"
$PY daily.py status 2>&1 | tee -a "$LOG"
say "=== done ==="
