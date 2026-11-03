/** Block-level parser for the blog Markdown subset (see Markdown.tsx). */

export type Block =
  | { type: 'heading'; level: 2 | 3; text: string; id: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'code'; lang: string; code: string }
  | { type: 'quote'; text: string }
  | { type: 'callout'; kind: 'tip' | 'note' | 'warning'; title: string; text: string }
  | { type: 'table'; head: string[]; rows: string[][] }
  | { type: 'rule' };

export const slugify = (text: string) =>
  text.toLowerCase().replace(/[*_`]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const splitRow = (line: string) => line.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim());

export function parseMarkdown(source: string): Block[] {
  const lines = source.replace(/\r\n?/g, '\n').split('\n');
  const blocks: Block[] = [];
  let i = 0;

  const isBlockStart = (line: string) =>
    /^(#{2,3})\s/.test(line) || /^```/.test(line) || /^>\s?/.test(line) || /^\s*([-*]|\d+\.)\s+/.test(line) || /^---+\s*$/.test(line) || /^\|/.test(line);

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i += 1;
      continue;
    }

    const heading = line.match(/^(#{2,3})\s+(.*)$/);
    if (heading) {
      const text = heading[2].trim();
      blocks.push({ type: 'heading', level: heading[1].length as 2 | 3, text, id: slugify(text) });
      i += 1;
      continue;
    }

    const fence = line.match(/^```\s*([\w+-]*)\s*$/);
    if (fence) {
      const code: string[] = [];
      i += 1;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) {
        code.push(lines[i]);
        i += 1;
      }
      i += 1; // closing fence (or end of input)
      blocks.push({ type: 'code', lang: fence[1].toLowerCase(), code: code.join('\n') });
      continue;
    }

    if (/^---+\s*$/.test(line)) {
      blocks.push({ type: 'rule' });
      i += 1;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quoted: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quoted.push(lines[i].replace(/^>\s?/, ''));
        i += 1;
      }
      const callout = quoted[0].match(/^\[!(TIP|NOTE|WARNING)\]\s*(.*)$/i);
      if (callout) {
        blocks.push({
          type: 'callout',
          kind: callout[1].toLowerCase() as 'tip' | 'note' | 'warning',
          title: callout[2].trim(),
          text: quoted.slice(1).join(' ').trim(),
        });
      } else {
        blocks.push({ type: 'quote', text: quoted.join(' ').trim() });
      }
      continue;
    }

    if (/^\|/.test(line)) {
      const rows: string[][] = [];
      while (i < lines.length && /^\|/.test(lines[i])) {
        rows.push(splitRow(lines[i]));
        i += 1;
      }
      const hasDivider = rows.length > 1 && rows[1].every((cell) => /^:?-{3,}:?$/.test(cell));
      blocks.push({ type: 'table', head: rows[0], rows: rows.slice(hasDivider ? 2 : 1) });
      continue;
    }

    const listMatch = line.match(/^\s*([-*]|\d+\.)\s+/);
    if (listMatch) {
      const ordered = /\d/.test(listMatch[1]);
      const items: string[] = [];
      const itemPattern = ordered ? /^\s*\d+\.\s+(.*)$/ : /^\s*[-*]\s+(.*)$/;
      while (i < lines.length) {
        const item = lines[i].match(itemPattern);
        if (item) {
          items.push(item[1]);
        } else if (lines[i].trim() && /^\s{2,}/.test(lines[i]) && items.length) {
          items[items.length - 1] += ' ' + lines[i].trim(); // wrapped continuation line
        } else {
          break;
        }
        i += 1;
      }
      blocks.push({ type: 'list', ordered, items });
      continue;
    }

    const paragraph: string[] = [];
    while (i < lines.length && lines[i].trim() && !isBlockStart(lines[i])) {
      paragraph.push(lines[i].trim());
      i += 1;
    }
    blocks.push({ type: 'paragraph', text: paragraph.join(' ') });
  }

  return blocks;
}

export function isSafeHref(href: string): boolean {
  if (href.startsWith('/') && !href.startsWith('//')) return true;
  if (href.startsWith('#')) return true;
  return /^(https?:|mailto:)/i.test(href);
}
