# Synapse Medical website

Marketing website of [Synapse Medical](https://synapse-medical.fr), built with [Astro](https://astro.build) and deployed as static assets on Cloudflare Workers. French at the root, English under `/en/`.

The documentation lives in its own repository ([synapse-docs](https://github.com/stevenCayla/synapse-docs), https://docs.synapse-medical.fr).

## Environments

| Branch | Published at | Deployment |
|--------|--------------|------------|
| `develop` | https://dev-www.synapse-medical.fr (not indexed, IP-restricted) | Automatic on every push |
| `main` | https://synapse-medical.fr | Manual only: run the CI workflow on `main` |

## Getting started

```sh
npm ci
npm run dev      # http://localhost:4321
npm run check    # type check (astro check)
npm run build    # static site in dist/
```

Node 24 or later (see `.nvmrc`).

## Layout

| Path | Content |
|------|---------|
| `src/pages/` | Routes: the two home pages, the 404 pages, the search index and a catch-all route (`[...path].astro`) that renders every other page |
| `src/i18n/routes.ts` | The route table: one entry per page and language, with the slugs of `URLS.md` |
| `src/views/` | One component per page type |
| `src/data/` | Texts and figures, French and English side by side (`{ fr, en }`) |
| `src/components/`, `src/layouts/` | Header, footer, search, cookie banner, hero, call-to-action band |
| `src/scripts/` | Client scripts: theme, menu, search, cookies, pricing calculator, product tour, status charts, forms |
| `src/styles/` | Design tokens and styles of the Synapse design (light and dark) |
| `src/site.ts` | External addresses (documentation, application, mailboxes) |

To add a page: create its view, add an entry to `src/i18n/routes.ts` and a title and description to `src/i18n/meta.ts`, then register the view in `src/pages/[...path].astro`.

## Security

`public/_headers` sets a strict Content Security Policy (`script-src 'self'`): no inline script and no third-party resource. Fonts are self-hosted (Fontsource). Astro bundles the client scripts into `/_astro/`, and `integrations/externalize-inline-scripts.mjs` moves any remaining inline script out of the generated HTML.

## Forms

The site has no server side yet. The demo request form and the status alert form validate the input, then open the visitor's mail client with the message pre-filled. See the issues of the "M5 · Conversion" milestone.

## Hosting and deployment

`wrangler.jsonc` describes the Worker and its two custom domains. `scripts/deploy.sh dev|prod` deploys `dist/`; the CI does it with `CLOUDFLARE_API_TOKEN` (secret) and `CLOUDFLARE_ACCOUNT_ID` (variable). The IP restriction of the development site is a custom WAF rule in the Cloudflare dashboard.

## License

MIT, see [LICENSE](LICENSE).
