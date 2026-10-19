import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import { existsSync, realpathSync } from 'node:fs';

// wiki/ 常是指向別處的符號連結；dev server 要允許讀它的實際位置，首頁才能讀 log.md。
const wikiRealPath = existsSync('./wiki') ? realpathSync('./wiki') : undefined;

export default defineConfig({
  output: 'server',
  adapter: cloudflare({ imageService: 'passthrough' }),
  session: false,
  vite: {
    server: {
      allowedHosts: true,
      ...(wikiRealPath ? { fs: { allow: ['.', wikiRealPath] } } : {}),
    },
  },
});
