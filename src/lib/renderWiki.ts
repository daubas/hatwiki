import { Marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

const marked = new Marked({
  walkTokens(token) {
    if (token.type === 'link' && token.href.startsWith('/') && token.href.endsWith('.md')) {
      token.href = `/wiki/${token.href.slice(1, -3)}`;
    }
  },
  extensions: [
    {
      name: 'citationDefinition',
      level: 'block',
      start: (source) => source.search(/^\[\^(?!source-)[A-Za-z0-9_-]+\]:/m),
      tokenizer(source) {
        const match = /^\[\^((?!source-)[A-Za-z0-9_-]+)\]:[ \t]*(.+)(?:\n|$)/.exec(source);
        if (!match) return undefined;
        return {
          type: 'citationDefinition',
          raw: match[0],
          citationId: match[1],
          tokens: this.lexer.inlineTokens(match[2]),
        };
      },
      renderer(token) {
        const citationId = String(token.citationId);
        return `<p class="citation-definition"><strong>[${citationId}]</strong> ${this.parser.parseInline(token.tokens)}</p>\n`;
      },
    },
    {
      name: 'citationReference',
      level: 'inline',
      start: (source) => source.indexOf('[^'),
      tokenizer(source) {
        const match = /^\[\^((?!source-)[A-Za-z0-9_-]+)\](?!:)/.exec(source);
        if (!match) return undefined;
        return { type: 'citationReference', raw: match[0], citationId: match[1] };
      },
      renderer(token) {
        const citationId = String(token.citationId);
        return `<sup class="citation-ref">[${citationId}]</sup>`;
      },
    },
    {
      name: 'privateSourceCitation',
      level: 'inline',
      start: (source) => source.indexOf('[^source-'),
      tokenizer(source) {
        const match = /^\[\^(source-[A-Za-z0-9_-]+)\](?!:)/.exec(source);
        if (!match) return undefined;
        return { type: 'privateSourceCitation', raw: match[0], citationId: match[1] };
      },
      renderer(token) {
        return `<span class="source-unavailable">[${String(token.citationId)}]</span>`;
      },
    },
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

function routeRelativeMarkdownLinks(html: string, pageId?: string): string {
  if (!pageId) return html;
  const base = pageId.split('/').slice(0, -1);

  return html.replace(/(<a href=")([^"?#]+\.md)([?#][^"]*)?("[^>]*>)/g, (match, before, href, suffix = '', after) => {
    if (href.startsWith('/') || /^[a-z][a-z\d+.-]*:/i.test(href) || href.startsWith('//')) return match;
    const segments = [...base];
    for (const segment of href.split('/')) {
      if (!segment || segment === '.') continue;
      if (segment === '..') {
        if (!segments.pop()) return match;
      } else {
        segments.push(segment);
      }
    }
    segments[segments.length - 1] = segments.at(-1)!.replace(/\.md$/i, '');
    return `${before}/wiki/${segments.map(encodeURIComponent).join('/')}${suffix}${after}`;
  });
}

export async function renderWiki(markdown: string, pageId?: string): Promise<string> {
  const rendered = await marked.parse(markdown);
  return routeRelativeMarkdownLinks(sanitizeHtml(rendered, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    allowedAttributes: {
      a: ['href'],
      img: ['src', 'alt', 'title'],
      p: ['class'],
      span: ['class'],
      sup: ['class'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    disallowedTagsMode: 'escape',
  }), pageId).replace(/<a href="\/wiki\/(?:raw|extracted)\/[^"]*">([\s\S]*?)<\/a>/g, '<span class="source-unavailable">$1</span>');
}

export function hasVisiblePrivateSourceCitation(markdown: string, citationId: string): boolean {
  let found = false;
  marked.walkTokens(marked.lexer(markdown), (token) => {
    if (token.type === 'privateSourceCitation' && String(token.citationId) === citationId) found = true;
  });
  return found;
}
