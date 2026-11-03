# Documentation maintenance

Use master. This is an independent public repository; the sibling NovcicExchange repository owns implementation and the canonical BRANDING.md/tokens.

Read BRANDING.md before UI changes. Keep the light Meadow design, local search and accessible responsive navigation. Do not introduce a dark theme.

For API changes, audit implementation first, synchronize the contract, regenerate reference pages, update relevant guides/examples/changelog, run npm test and npm run build. Every operation needs accurate permissions, precision, response fields, errors and lifecycle behavior. Do not invent production URLs, methods or pagination.

Do not commit credentials, account artifacts, task.txt or environment files. Keep signing examples read-only by default. Commit documentation separately and verify the GitHub Pages deployment after publishing.
