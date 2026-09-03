export type WikiOutlineItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

function headingText(value: string): string {
  return value
    .replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g, '$2')
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
    .replace(/!?\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[`*_~]/g, '')
    .trim();
}

function headingId(text: string, used: Map<string, number>): string {
  const base = text.normalize('NFKC').toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '') || 'section';
  const count = used.get(base) ?? 0;
  used.set(base, count + 1);
  return count === 0 ? base : `${base}-${count + 1}`;
}

export function extractWikiOutline(markdown: string): WikiOutlineItem[] {
  const used = new Map<string, number>();
  const outline: WikiOutlineItem[] = [];
  const headingPattern = /^(#{2,3})[ \t]+(.+?)[ \t]*$/gm;

  for (const match of markdown.matchAll(headingPattern)) {
    const text = headingText(match[2].replace(/[ \t]+#+[ \t]*$/, ''));
    if (!text) continue;
    const level = match[1].length as 2 | 3;
    outline.push({ id: headingId(text, used), text, level });
  }

  return outline;
}

export function removeLeadingTitle(html: string): string {
  return html.replace(/^\s*<h1(?:\s[^>]*)?>[\s\S]*?<\/h1>\s*/i, '');
}

export function addHeadingIds(html: string, outline: WikiOutlineItem[]): string {
  let outlineIndex = 0;
  return html.replace(/<h([23])(?:\s[^>]*)?>([\s\S]*?)<\/h\1>/gi, (heading, levelText, inner) => {
    const level = Number(levelText) as 2 | 3;
    while (outlineIndex < outline.length && outline[outlineIndex].level !== level) outlineIndex += 1;
    const item = outline[outlineIndex];
    if (!item) return heading;
    outlineIndex += 1;
    return `<h${level} id="${item.id}">${inner}</h${level}>`;
  });
}
