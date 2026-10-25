import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import externalizeInlineScripts from './integrations/externalize-inline-scripts.mjs';
import { alternates } from './integrations/sitemap-alternates.mjs';

// Synapse Medical website. French at the root, English under /en/ (see src/i18n/routes.ts).
export default defineConfig({
  site: 'https://synapse-medical.fr',
  // Clean URLs without trailing slash (/fonctionnalites), as in URLS.md; the two home pages are index.html files.
  trailingSlash: 'never',
  build: { format: 'file' },
  redirects: {
    '/solutions': '/solutions/investigateur',
    '/en/solutions': '/en/solutions/investigator',
  },
  vite: {
    // No data: URIs for the fonts: the CSP only allows font-src 'self'.
    build: { assetsInlineLimit: 0 },
  },
  integrations: [
    sitemap({
      filter: (page) => !/\/404$/.test(page) && !/\/solutions$/.test(page),
      serialize: (item) => alternates(item),
    }),
    // Last: moves every inline <script> out of the generated HTML, for the
    // production CSP "script-src 'self'" (see the integration file).
    externalizeInlineScripts(),
  ],
});
