"""Stdlib-only Gmail compose HTML for drafts a person will send by hand."""
import html
import re

# Match gmail-draft's link types and punctuation, before escaping so an HTML
# entity's semicolon can never be mistaken for trailing URL punctuation.
LINK = re.compile(
    r"(?P<url>https?://[^\s<>]+)"
    r"|(?P<mail>\b[\w.+-]+@[\w-]+(?:\.[\w-]+)+\b)"
    r"|(?P<bare>\b(?:[a-z0-9-]+\.)+(?:com|org|net|soccer|io|app|co|edu|us|gov)\b(?:/[^\s<>]*)?)",
    re.IGNORECASE,
)
TRAILING = ".,;:!?)'\""
GREETING = re.compile(r"^(?:dear|hi|hello|hey)\b.*[,:!]$", re.IGNORECASE)


def linkify(text):
    """Escape a plain-text line and turn its URLs, domains and emails into links."""
    pieces = []
    end = 0
    for match in LINK.finditer(text):
        pieces.append(html.escape(text[end:match.start()], quote=False))
        token = match.group().rstrip(TRAILING)
        tail = match.group()[len(token):]
        if match.group("mail"):
            href = f"mailto:{token}"
        elif match.group("url"):
            href = token
        else:
            href = f"https://{token}"
        pieces.append(f'<a href="{html.escape(href, quote=True)}">'
                      f'{html.escape(token, quote=False)}</a>{html.escape(tail, quote=False)}')
        end = match.end()
    pieces.append(html.escape(text[end:], quote=False))
    return "".join(pieces)


def to_html(text):
    """Reflow pre-wrapped paragraphs, preserving short lines and blank lines."""
    blocks = []
    # Keep each blank line: it is a visible empty div in Gmail's compose markup.
    for paragraph in re.split(r"(\n[ \t]*\n)", text.replace("\r\n", "\n")):
        if paragraph.startswith("\n") and not paragraph.strip():
            blocks.append("<div><br></div>")
            continue
        lines = paragraph.split("\n")
        if lines and GREETING.match(lines[0]):
            blocks.append(f"<div>{linkify(lines.pop(0))}</div>")
        # The production gmail-draft heuristic: all but the last line are 40–80
        # characters. Short signature lines and greetings must stay separate.
        if len(lines) > 1 and all(40 <= len(line) <= 80 for line in lines[:-1]):
            lines = [" ".join(line.strip() for line in lines)]
        blocks.extend(f"<div>{linkify(line) if line.strip() else '<br>'}</div>" for line in lines)
    return '<div dir="ltr">' + "".join(blocks) + "</div>"
