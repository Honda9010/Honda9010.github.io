import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://honda9010.github.io',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  integrations: [mdx(), sitemap()],
});
