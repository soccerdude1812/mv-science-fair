---
name: Google Docs access via gws CLI
description: WebFetch /pub URLs return 401 for non-published Google Docs; use gws CLI instead
type: reference
---

Google Docs that are not published to the web return HTTP 401 when fetched via WebFetch with `/pub` or `/export` URLs. Use the `gws` CLI instead:

```bash
gws docs documents get --params '{"documentId": "<DOC_ID>"}' | python3 -c "
import json, sys
data = json.load(sys.stdin)
body = data.get('body', {})
content = body.get('content', [])
text = []
for item in content:
    para = item.get('paragraph', {})
    for elem in para.get('elements', []):
        run = elem.get('textRun', {})
        t = run.get('content', '')
        if t:
            text.append(t)
print(''.join(text))
"
```

This works for any Google Doc the authenticated account has access to. The Science Fair docs are accessible this way.

Google Forms that are not set to public also return 401 via WebFetch — no workaround found via gws (Forms API is separate).
