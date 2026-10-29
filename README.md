<div align="center">

# Synapse Website

**The public website of [Synapse Medical](https://synapse-medical.fr)**<br>
The EDC platform for clinical research, in French and English.

[![CI](https://github.com/stevenCayla/synapse-www/actions/workflows/ci.yaml/badge.svg)](https://github.com/stevenCayla/synapse-www/actions/workflows/ci.yaml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Astro](https://img.shields.io/badge/Astro-7-ff5d01.svg)](https://astro.build)

[Production](https://synapse-medical.fr) · [Development](https://dev-www.synapse-medical.fr) · [Documentation](https://docs.synapse-medical.fr) · [Report an issue](https://github.com/stevenCayla/synapse-www/issues)

</div>

---

## Contents

- [Overview](#overview)
- [Environments](#environments)
- [Getting started](#getting-started)
- [Repository layout](#repository-layout)
- [Demo request](#demo-request)
- [Hosting and deployment](#hosting-and-deployment)
- [Branches and releases](#branches-and-releases)
- [Security](#security)
- [License](#license)

## Overview

A small site built with [Astro](https://astro.build), served as static files by a
Cloudflare Worker. French is served at the root, English under `/en/`.

| Page | Address | What it provides |
|------|---------|------------------|
| Home | `/`, `/en/` | The coming-soon page: animated background, logo, link to the documentation and to the demo request |
| Demo request | `/demo/`, `/en/demo/` | The "Request a demo" form, e-mailed to the team (see [Demo request](#demo-request)) |
| Not found | any unknown address | One 404 page for both languages, in the language of the requested path |

Both languages share the same pages, with `hreflang` alternates and a sitemap that
lists them. The complete version of the site (about 70 pages) is developed on the
`new-version` branch and is not published yet.

The product documentation lives in its own repository,
[synapse-docs](https://github.com/stevenCayla/synapse-docs).

## Environments

| Branch | Published at | Deployment |
|--------|--------------|------------|
| `develop` | https://dev-www.synapse-medical.fr (not indexed) | Automatic on every push |
| `main` | https://synapse-medical.fr | Manual only (see [Hosting and deployment](#hosting-and-deployment)) |
| `new-version` | not published | Complete redesign of the site, in progress |

## Getting started

Requires Node.js 24 (see `.nvmrc`; `nvm use` selects it).

```bash
npm ci                    # install the dependencies
npm run dev               # dev server on http://localhost:4321 (pages only)
npm test                  # unit tests of the demo request validation
npm run build             # build dist/
npm run preview           # serve dist/
npm run dev:worker        # build, then run the site with its Worker (wrangler dev)
```

`npm run dev` serves the pages but not the Worker: use `npm run dev:worker` to try
the demo request form (see [Local development](#local-development)).

## Repository layout

```text
.
├── .github/workflows/ci.yaml      Test, build and deployment pipeline
├── integrations/                  Astro integration (CSP-safe inline scripts)
├── public/                        Static files: theme script, headers (_headers), robots.txt, favicon
├── scripts/deploy.sh              Deployment of dist/ (dev or prod)
├── src/
│   ├── i18n.ts                    Languages, addresses and texts shared by the pages
│   ├── layouts/Minimal.astro      Page layout (head, header, language switch, footer)
│   ├── pages/                     index, demo, 404 and their English counterparts under en/
│   ├── scripts/                   Client scripts: theme, animated background, demo form
│   ├── styles/                    Design tokens and styles of the Synapse design
│   └── views/                     One component per page (Home, Demo), used by both languages
├── test/                          Unit tests (node:test)
├── worker/                        Worker of the demo request (POST /api/demo)
└── wrangler.jsonc                 Cloudflare Workers configuration
```

To add a page: create its view in `src/views/`, then one page per language in
`src/pages/` and `src/pages/en/`. Give `Minimal.astro` the `paths` of both languages
so that the canonical URL, the `hreflang` links and the language switch are right.

## Demo request

The form of `/demo/` posts to `POST /api/demo`, handled by the Worker in `worker/`:

1. the body is validated (`worker/validate.ts`): size limit, field lengths, no control
   characters (which would allow header injection), honeypot field `website`;
2. the Cloudflare Turnstile token is checked with the `siteverify` API;
3. the request is e-mailed through the Proton SMTP server (`smtp.protonmail.ch:587`,
   STARTTLS) with [worker-mailer](https://github.com/zou-yu/worker-mailer) (MIT).

The visitor always receives the same generic answer. Nothing is stored and nothing
personal is logged. `wrangler.jsonc` sends only `/api/*` to the Worker
(`assets.run_worker_first`): every other address is served by the static assets, and
unknown ones by the 404 page.

### Settings and secrets

The repository is public: no secret is ever written in it.

Public variables, in `wrangler.jsonc` (repeated under `env.dev`: variables are not
inherited):

| Variable | Role |
|----------|------|
| `TURNSTILE_SITE_KEY` | Site key of the Turnstile widget (public) |
| `DEMO_RECIPIENT` | Mailbox that receives the requests |
| `DEMO_SENDER` | From address, the Proton address of the SMTP token |
| `DEMO_SEND` | `smtp` sends the e-mail, `dry-run` validates and sends nothing (default of `dev`) |

Secrets, one command each (the value is asked by the command):

```bash
# Production
npx wrangler secret put TURNSTILE_SECRET_KEY
npx wrangler secret put SMTP_USERNAME
npx wrangler secret put SMTP_TOKEN

# Development
npx wrangler secret put TURNSTILE_SECRET_KEY --env dev
npx wrangler secret put SMTP_USERNAME --env dev
npx wrangler secret put SMTP_TOKEN --env dev
```

`SMTP_USERNAME` is the Proton address the SMTP token was created for, and `SMTP_TOKEN`
the token itself. The Turnstile widget must list `synapse-medical.fr` and
`dev-www.synapse-medical.fr`. Run the commands from the root of the repository.

### Local development

```bash
cp .dev.vars.example .dev.vars
npm run dev:worker
```

`.dev.vars` is ignored by git. The example holds the Turnstile test keys (the
challenge always passes) and `DEMO_SEND=dry-run`, so nothing is e-mailed. To send for
real, set `DEMO_SEND=smtp`, `SMTP_USERNAME` and `SMTP_TOKEN` in `.dev.vars`.

## Hosting and deployment

The site is a Cloudflare Worker that serves the files of `dist/` (`wrangler.jsonc`).
The script `worker/index.ts` runs only for `/api/*`.

| Environment | Command | Domain |
|-------------|---------|--------|
| production | `wrangler deploy --env=""` | synapse-medical.fr |
| development | `wrangler deploy --env dev` | dev-www.synapse-medical.fr |

### CI pipeline

`.github/workflows/ci.yaml` tests and builds the site on every pull request, then
deploys as follows:

| Trigger | Result |
|---------|--------|
| pull request | test and build only |
| push to `develop` | build, then deploy to dev-www (environment `development`) |
| *Run workflow* on `develop` | same |
| push to `main` | build only, **no deployment** |
| *Run workflow* on `main` | build, then deploy to synapse-medical.fr (environment `production`) |

Production is deployed manually only. The plan has no "required reviewers"
environment rule, so running the workflow by hand on `main` is the approval gate:
*Actions → CI → Run workflow → branch `main`*, or `gh workflow run ci.yaml --ref main`.

Manual deployment if needed (after `npx wrangler login`):

```bash
npm run deploy:dev
npm run deploy:prod
```

### GitHub configuration

| Type | Name | Value |
|------|------|-------|
| Secret | `CLOUDFLARE_API_TOKEN` | Cloudflare API token ("Edit Cloudflare Workers" template) |
| Variable | `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID |

Environments `development` and `production` are set under *Settings → Environments*.

## Branches and releases

- Work branches start from `develop` (`feat/…`, `fix/…`, `docs/…`, `ci/…`, `chore/…`)
  and their pull request targets `develop`. Commits follow Conventional Commits.
- `develop` is deployed automatically to dev-www.
- Promotion to `main` happens only on explicit request, through a pull request
  `develop` → `main`, merged with a merge commit so that `main` stays an ancestor of
  `develop`. Run the CI by hand on `main` to publish.
- `new-version` carries the complete redesign. It joins `develop` through a pull
  request when it is ready to be published.
- Dependabot opens weekly updates on `develop`, with the `chore(deps)` prefix. Major
  TypeScript updates are ignored on `new-version` until `astro check` supports
  TypeScript 7.

## Security

- The site is served with HSTS, a strict Content Security Policy
  (`script-src 'self'`, no inline script), `nosniff`, frame and referrer policies
  (`public/_headers`). Only `/demo/` and `/en/demo/` also allow
  `challenges.cloudflare.com` (script and frame) for Turnstile.
- `integrations/externalize-inline-scripts.mjs` moves every inline script of the
  generated HTML into a file, for the CSP. Fonts are self-hosted (Fontsource).
- Workflows run with read-only permissions by default.
- Dependency audit: `npm audit` reports no vulnerability.

## License

Released under the [MIT License](LICENSE).
