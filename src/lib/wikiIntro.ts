export function extractWikiIntro(markdown: string): { title: string; text: string } | undefined {
  const body = markdown.replace(/^---\n[\s\S]*?\n---\n/, '');
  const lines = body.split('\n');
  const headingIndex = lines.findIndex((line) => /^# /.test(line));
  if (headingIndex === -1) return undefined;

  const paragraph: string[] = [];
  for (const line of lines.slice(headingIndex + 1)) {
    if (!line.trim()) {
      if (paragraph.length) break;
      continue;
    }
    if (/^(#|-|\*|>|\d+\.)/.test(line.trim())) {
      if (paragraph.length) break;
      continue;
    }
    paragraph.push(line.trim());
  }
  if (!paragraph.length) return undefined;

  const text = paragraph.join(' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1');
  return { title: lines[headingIndex].slice(2).trim(), text };
}
