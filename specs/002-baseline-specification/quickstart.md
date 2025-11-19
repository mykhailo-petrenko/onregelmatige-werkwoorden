# Quickstart

How to run the developer environment and test exports/imports for the Baseline feature.

1. Install dependencies

```bash
cd web-ui
npm install
```

2. Run the dev server

```bash
npm run dev
```

3. Run unit tests (Vitest)

Install Vitest if not present (the plan recommends adding it to devDependencies):

```bash
cd web-ui
npm install -D vitest @testing-library/react
npm run test  # configure script to run vitest
```

4. Export example (local script)

Run the export script (to be created under `web-ui/scripts/exports/` or `data/`):

```bash
node web-ui/scripts/exports/export-progress.js --out progress-2025-11-18.json
```

5. Import example

Use the import UI in the app or a CLI that reads the JSON and applies overwrite/merge behavior.
