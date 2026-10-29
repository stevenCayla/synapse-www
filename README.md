# Synapse Medical website

Website of [Synapse Medical](https://synapse-medical.fr), built with [Astro](https://astro.build) and hosted on Cloudflare Workers (static assets and a small Worker). French at the root, English under `/en/`.

## Environments

| Branch | Published at | Deployment |
|--------|--------------|------------|
| `develop` | https://dev-www.synapse-medical.fr (not indexed) | Automatic on every push |
| `main` | https://synapse-medical.fr | Manual only: run the CI workflow on `main` |

## Getting started

```sh
npm ci
npm run dev
npm test
npm run build
```

Node 24 or later (see `.nvmrc`). `npm run dev` serves the pages only: the demo request needs the Worker (see below).

## Demo request

`/demo` (and `/en/demo`) hosts the "Request a demo" form. The page posts to `POST /api/demo`, handled by the Worker in `worker/`:

1. the body is validated (`worker/validate.ts`): size limit, field lengths, no control characters, honeypot field `website`;
2. the Cloudflare Turnstile token is checked with the `siteverify` API;
3. the request is e-mailed through the Proton SMTP server (`smtp.protonmail.ch:587`, STARTTLS) with [worker-mailer](https://github.com/zou-yu/worker-mailer) (MIT).

The client always receives the same generic answer. Nothing is stored and nothing personal is logged.

`wrangler.jsonc` sends only `/api/*` to the Worker (`assets.run_worker_first`): every other address is served by the static assets, and unknown ones by the 404 page.

### Settings and secrets

The repository is public: no secret is ever written in it.

Public variables, in `wrangler.jsonc` (and again under `env.dev`, variables are not inherited):

| Variable | Role |
|----------|------|
| `TURNSTILE_SITE_KEY` | Site key of the Turnstile widget |
| `DEMO_RECIPIENT` | Mailbox that receives the requests |
| `DEMO_SENDER` | From address (a Proton address of the domain) |
| `DEMO_SEND` | `smtp` sends the e-mail, `dry-run` validates and sends nothing |

Secrets, one command each (paste the value when asked):

```sh
npx wrangler secret put TURNSTILE_SECRET_KEY
npx wrangler secret put SMTP_USERNAME
npx wrangler secret put SMTP_TOKEN
```

Same for the development site, with `--env dev`:

```sh
npx wrangler secret put TURNSTILE_SECRET_KEY --env dev
npx wrangler secret put SMTP_USERNAME --env dev
npx wrangler secret put SMTP_TOKEN --env dev
```

`SMTP_USERNAME` is the Proton address and `SMTP_TOKEN` an SMTP token generated in the Proton settings.

The Turnstile widget must list `synapse-medical.fr` and `dev-www.synapse-medical.fr`.

`dev-www` is set to `DEMO_SEND=dry-run`: change it in `wrangler.jsonc` to test a real delivery.

### Local development

```sh
cp .dev.vars.example .dev.vars
npm run dev:worker
```

`.dev.vars` is ignored by git. The example holds the Turnstile test keys (the challenge always passes) and `DEMO_SEND=dry-run`, so nothing is e-mailed. To send for real, set `DEMO_SEND=smtp`, `SMTP_USERNAME` and `SMTP_TOKEN` in `.dev.vars`.

## Security

`public/_headers` sets a strict Content Security Policy: `script-src 'self'`, no inline script, self-hosted fonts. Only `/demo` and `/en/demo` also allow `challenges.cloudflare.com` (script and frame) for Turnstile.

## Hosting and deployment

`scripts/deploy.sh dev|prod` deploys `dist/` and the Worker. The CI does it with `CLOUDFLARE_API_TOKEN` (secret) and `CLOUDFLARE_ACCOUNT_ID` (variable).

## License

MIT, see [LICENSE](LICENSE).
