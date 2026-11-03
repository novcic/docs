# Contract and design maintenance

This site is maintained in the independent [novcic/docs repository](https://github.com/novcic/docs), on `master`. The exchange source lives in the sibling `NovcicExchange` checkout. Documentation is built with Docusaurus and published through GitHub Actions to GitHub Pages.

## Updating the contract

1. Change and test the exchange behavior. Review public route declarations, authentication rules and response models.
2. Update the audited catalog in `NovcicExchange/scripts/export-api.py`; run `python scripts/sync-docs.py` from the exchange.
3. In docs, run `node scripts/reference.mjs` to regenerate reference/schema pages. Update explanatory guides, examples and this release's changelog where behavior changed.
4. Run `npm test` and `npm run build`; inspect the built site on desktop and mobile.
5. Commit the exchange and docs separately on `master`. Publish the docs commit with the corresponding exchange release.

`api/source-manifest.json` records SHA-256 hashes of the audited source files. `api/openapi.json` and `static/openapi.json` must remain identical. The generated reference must contain one page per operation. CI checks these invariants and builds with broken-link errors enabled. API changes are never considered complete while the contract snapshot is stale.

## Updating branding

`NovcicExchange/BRANDING.md` and `branding/tokens.json` define the design contract. Increment the version for intentional design changes, regenerate token CSS, and run the same sync script. Docs has a checked copy of BRANDING.md, token JSON/CSS and the decorative meadow asset. `branding/manifest.json` records their release hashes; CI rejects accidental divergence.

Keep a single light theme, readable typography, forest-green actions, sage surfaces, aligned decimal values and restrained botanical decoration. Financial examples must preserve exact strings and realistic states. Do not introduce unavailable environments, fake trading activity or unsupported API promises to fill a visual gap.

## Verification

The signing examples have deterministic cross-language vectors. Run a read-only request against a local exchange after protocol changes. Exercise an idempotent order round trip on a dedicated local account after trading changes. Never include private account credentials, cookies, raw signing material or local operational artifacts in this public repository.
