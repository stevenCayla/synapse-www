# Contributing

## Workflow

- Work branches start from `develop` (`feat/…`, `fix/…`, `docs/…`, `ci/…`, `chore/…`)
  and their pull request targets `develop`. The complete redesign lives on
  `new-version`.
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org),
  in English: `feat(demo): add a back link`.
- `main` is protected: changes reach it through a pull request whose `build` check
  passes. Production is published by running the CI by hand on `main`.
- Never commit a secret: the repository is public. See the README for the settings
  and the secrets of the demo request.

## Before opening a pull request

```bash
npm ci
npm test
npm run build
```

Check the pages you changed in both languages (French at the root, English under
`/en/`) and in both themes. No inline script: the Content Security Policy is
`script-src 'self'`.

## Reporting a problem

Open an issue with the form that matches. For a security problem, follow
[SECURITY.md](SECURITY.md) instead.
