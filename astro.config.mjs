import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import externalizeInlineScripts from './integrations/externalize-inline-scripts.mjs';

// Synapse Medical website — coming-soon page (FR at the root, EN under /en/) and a not-found page.
export default defineConfig({
  site: 'https://synapse-medical.fr',
  vite: {
    // No data: URIs for the fonts: the CSP only allows font-src 'self'.
    build: { assetsInlineLimit: 0 },
  },
  // Last: moves every inline <script> out of the generated HTML, for the
  // production CSP "script-src 'self'" (see the integration file).
  integrations: [sitemap({ i18n: { defaultLocale: 'fr', locales: { fr: 'fr', en: 'en' } }, filter: (page) => !/\/404$/.test(page) }), externalizeInlineScripts()],
});
