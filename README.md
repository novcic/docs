# Novčić API documentation

Complete public integration documentation for the implemented exchange API. Live site: https://novcic.github.io/docs/

Independent repository, branch **master**. Requires Node.js 20 or newer.

```sh
npm ci
npm test
npm run build
npm run serve
```

The local production preview is http://127.0.0.1:3000/docs/ . `npm start` runs the development server.

Update protocol/branding snapshots from the sibling exchange with `python scripts/sync-docs.py`, then run `node scripts/reference.mjs` here. Guides are authored independently; generated endpoint/schema pages derive from the audited catalog. See [maintenance](docs/maintenance.md) and [BRANDING.md](BRANDING.md).

Pushes to master build, validate and publish through `.github/workflows/pages.yml`. Pull requests validate without deployment. The site never accepts exchange credentials or sends trading requests.
