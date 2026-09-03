import { Marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

const marked = new Marked({
  extensions: [
    {
      name: 'wikilink',
      level: 'inline',
      start: (source) => source.indexOf('[['),
      tokenizer(source) {
        const match = /^\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/.exec(source);
        if (!match) return undefined;
        return { type: 'wikilink', raw: match[0], target: match[1].trim(), label: (match[2] ?? match[1]).trim() };
      },
      renderer(token) {
        const target = String(token.target);
        const segments = target.split('/');
        if (!target || segments.some((segment) => !segment || segment === '.' || segment === '..')) {
          return String(token.label);
        }
        return `<a href="/wiki/${segments.map(encodeURIComponent).join('/')}">${String(token.label)}</a>`;
      },
    },
  ],
});

export async function renderWiki(markdown: string): Promise<string> {
  const rendered = await marked.parse(markdown);
  return sanitizeHtml(rendered, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    allowedAttributes: {
      a: ['href'],
      img: ['src', 'alt', 'title'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    disallowedTagsMode: 'escape',
  });
}
