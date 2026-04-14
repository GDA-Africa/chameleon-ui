---
nexus_doc: true
id: "08_deployment"
title: "Deployment"
status: populated
confidence: high
last_updated: "2026-04-14"
---

# Deployment

**Project:** Chameleon UI

---

## 🚀 Deployment Strategy

### Workshop App (Demo)

- **Platform:** Vercel or Netlify (static site)
- **Build:** `pnpm build` → Vite outputs to `dist/`
- **URL:** TBD

### NPM Package (Library)

- **Registry:** npmjs.com
- **Package name:** `@chameleon-ui-lib/react`
- **Current version:** `0.0.1`
- **Build:** Vite library mode → ESM + CJS + type declarations in `dist/`
- **Publish trigger:** Git tag `v*` → GitHub Actions `publish.yml` → `npm publish`

## 🔧 Environment Variables

| Variable    | Description      | Required            | Default       |
| ----------- | ---------------- | ------------------- | ------------- |
| `NODE_ENV`  | Environment      | Yes                 | `development` |
| `NPM_TOKEN` | npm publish auth | Only for CI publish | —             |

## 📦 CI/CD

### Current Status ✅

Both workflows are live in `.github/workflows/`:

**`ci.yml`** — triggers on push/PR to `main`:
- Install (`pnpm install`)
- Lint (`pnpm lint`)
- Format check (`pnpm format`)
- Typecheck (`pnpm typecheck` = `tsc --noEmit`)
- Tests (`pnpm test` = Vitest run)
- Build (`pnpm build`)

**`publish.yml`** — triggers on tag `v*`:
- Install → typecheck → test → lib build → `npm publish` using `NODE_AUTH_TOKEN` (set as `NPM_TOKEN` secret in repo settings)

## 📝 Build Scripts

| Script        | Command             | Status     |
| ------------- | ------------------- | ---------- |
| `dev`         | `vite`              | ✅ Works   |
| `build`       | `vite build`        | ✅ Works   |
| `typecheck`   | `tsc --noEmit`      | ✅ Works   |
| `test`        | `vitest run`        | ✅ Works   |
| `test:watch`  | `vitest`            | ✅ Works   |
| `lint`        | `eslint .`          | ✅ Works   |
| `format`      | `prettier --write .`| ✅ Works   |
