#!/bin/bash
# MV Science Fair sponsor bot, daily run.
#
# Order changed 2026-09-13. It used to research first, then write copy, then
# send, which meant a 19:00 slot did not actually mail anyone until 21:00 on a
# day the research stage ran long. For a three day sprint that is the wrong
# trade: send what is already verified the moment the job fires, then spend the
# rest of the evening refilling the queue for tomorrow.
#
# Every stage may fail without taking the others down.
set -uo pipefail

BOT="$HOME/mv-sponsor-bot"
PY="$BOT/.venv/bin/python"
CLAUDE="$HOME/.local/node/bin/claude"
export PATH="$HOME/.local/node/bin:$HOME/.local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"

CAP="${SPONSOR_CAP:-300}"
GAP="${SPONSOR_GAP:-22}"
DAY="$(date +%Y-%m-%d)"
LOG="$BOT/logs/$DAY.log"
mkdir -p "$BOT/logs"

say() { echo "[$(date '+%H:%M:%S')] $*" | tee -a "$LOG"; }

run_limited() {  # run_limited SECONDS cmd...  (macOS has no coreutils timeout)
  local secs=$1; shift
  "$@" &
  local pid=$! i=0
  while kill -0 "$pid" 2>/dev/null && [ "$i" -lt "$secs" ]; do sleep 1; i=$((i + 1)); done
  if kill -0 "$pid" 2>/dev/null; then
    kill -TERM "$pid" 2>/dev/null; sleep 5; kill -KILL "$pid" 2>/dev/null
    return 124
  fi
  wait "$pid"
}

say "=== MV sponsor bot, $DAY, cap $CAP, gap ${GAP}s ==="
cd "$BOT" || exit 1

# Eeshan scoped this to three days on 2026-09-13: tonight, the 14th and the 15th.
# After that the job removes itself. A cold sponsorship ask in the last week
# before the fair is worse than no ask at all, and after the fair it is noise.
if [[ "$DAY" > "2026-09-15" ]]; then
  say "the three day sprint is over. Unloading myself so this does not run again."
  launchctl bootout "gui/$(id -u)/com.mvsciencefair.sponsorbot" 2>/dev/null
  exit 0
fi

say "--- inventory before ---"
$PY daily.py status 2>&1 | tee -a "$LOG"

# 1. Send. The only stage that talks to real businesses, and it goes first.
#
# --wait matters more than it looks. Gmail's ceiling is per ROLLING 24 hours, so
# at 19:00 the window still contains last night's whole batch and the budget is
# near zero. Those sends age out over the next two hours. Waiting up to four
# hours for the window to roll is the difference between 300 going out and 3.
say "--- sending ---"
$PY daily.py send --cap "$CAP" --gap "$GAP" --wait "${SPONSOR_WAIT:-240}" 2>&1 | tee -a "$LOG"
say "send exit ${PIPESTATUS[0]}"

# 2. Follow-ups: DRAFTS ONLY. Eeshan reviews and sends these by hand.
say "--- follow-up drafts (never sent) ---"
$PY daily.py followups --days 6 --cap 60 2>&1 | tee -a "$LOG"

# 3. Refill for tomorrow. Nothing below this line can delay a send.
CLAUDE_OK=0
if [ -x "$CLAUDE" ] && "$CLAUDE" -p "Reply with exactly: OK" >/dev/null 2>&1; then
  CLAUDE_OK=1
else
  say "WARNING: claude CLI unavailable or not logged in. Refill stages skipped."
  say "         Tonight's send already happened; only tomorrow's queue is affected."
fi

if [[ "$DAY" < "2026-09-15" ]]; then
  if $PY daily.py needs-research --cap "$CAP" >>"$LOG" 2>&1; then
    if [ "$CLAUDE_OK" = "1" ]; then
      say "inventory below cap, researching for tomorrow (90 min limit)"
      run_limited 5400 "$CLAUDE" -p "$(cat "$BOT/prompts/research.md")" \
        --permission-mode bypassPermissions >>"$LOG" 2>&1 \
        && say "research finished" || say "research failed or timed out, continuing"
    fi
  else
    say "inventory already at or above cap, skipping research"
  fi

  NEED=$($PY daily.py needs-lines --cap "$CAP" 2>/dev/null | grep -c '"row"' || true)
  if [ "${NEED:-0}" -gt 0 ] && [ "$CLAUDE_OK" = "1" ]; then
    say "$NEED rows need a personal line (60 min limit)"
    run_limited 3600 "$CLAUDE" -p "$(cat "$BOT/prompts/lines.md")" \
      --permission-mode bypassPermissions >>"$LOG" 2>&1 \
      && say "line authoring finished" || say "line authoring failed, continuing"
  else
    say "no copywriting needed or claude unavailable ($NEED rows waiting)"
  fi
else
  say "last night of the sprint, no point refilling the queue"
fi

say "--- inventory after ---"
$PY daily.py status 2>&1 | tee -a "$LOG"
say "=== done ==="
