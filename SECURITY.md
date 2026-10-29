# Security policy

This repository holds the source of the Synapse Medical website
(Astro, served by a Cloudflare Worker). It contains no patient data and no
application code. The demo request form only e-mails the details typed by the
visitor and stores nothing.

## Reporting a vulnerability

Please do not open a public issue for a security problem.

Report it privately with GitHub's
[private vulnerability reporting](https://github.com/stevenCayla/synapse-www/security/advisories/new)
(*Security* tab → *Report a vulnerability*). Include the page or file concerned,
the steps to reproduce it and the impact you see.

You will get an answer as soon as possible. Once the problem is fixed, the
report is published as a security advisory.

## Scope

- The website (https://synapse-medical.fr) and its build: scripts, headers
  (`public/_headers`), Content Security Policy, the Worker of the demo request
  (`worker/`), dependencies and the CI workflow.
- Vulnerabilities of the Synapse Medical application itself belong to the
  [SYNAPSE-MEDICAL](https://github.com/stevenCayla/SYNAPSE-MEDICAL) repository.

## Supported versions

Only the current site, built from the `main` branch, is maintained.
