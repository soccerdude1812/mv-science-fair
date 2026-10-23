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
    source_lines = text.replace("\r\n", "\n").split("\n")
    # Trim blank edge lines only in HTML; set_content still gets the original.
    while source_lines and not source_lines[0].strip():
        source_lines.pop(0)
    while source_lines and not source_lines[-1].strip():
        source_lines.pop()
    if not source_lines:
        return '<div dir="ltr"></div>'
    # Keep each internal blank line as a visible empty div in Gmail's compose markup.
    for paragraph in re.split(r"(\n[ \t]*\n)", "\n".join(source_lines)):
        if paragraph.startswith("\n") and not paragraph.strip():
            blocks.append("<div><br></div>")
            continue
        lines = paragraph.split("\n")
        if lines and GREETING.match(lines[0]):
            blocks.append(f"<div>{linkify(lines.pop(0))}</div>")
        # A short unpunctuated line after a completed sentence or sign-off can
        # be a name. Refusing a pre-wrapped draft is safer than silently joining
        # its lines, so gmail-draft's length heuristic needs this extra guard.
        signature = (len(lines) > 1 and len(lines[-1].strip()) < 40
                     and not lines[-1].rstrip().endswith((".", "!", "?"))
                     and lines[-2].rstrip().endswith((".", "!", "?", ",")))
        signature_line = lines.pop() if signature else None
        if len(lines) > 1 and all(40 <= len(line) <= 80 for line in lines[:-1]):
            lines = [" ".join(line.strip() for line in lines)]
        blocks.extend(f"<div>{linkify(line) if line.strip() else '<br>'}</div>" for line in lines)
        if signature_line is not None:
            blocks.append(f"<div>{linkify(signature_line)}</div>")
    return '<div dir="ltr">' + "".join(blocks) + "</div>"
