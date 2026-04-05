---
nexus_doc: true
id: "08_deployment"
title: "Deployment"
status: populated
confidence: medium
last_updated: "2026-04-05"
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
- **Package name:** `chameleon-ui` (TBD — check availability)
- **Build:** Vite library mode → ESM output
- **Publish trigger:** Git tag `v*` → GitHub Actions → `npm publish`

## 🔧 Environment Variables

| Variable    | Description      | Required            | Default       |
| ----------- | ---------------- | ------------------- | ------------- |
| `NODE_ENV`  | Environment      | Yes                 | `development` |
| `NPM_TOKEN` | npm publish auth | Only for CI publish | —             |

## 📦 CI/CD

### Current Status

- `.github/workflows/ci.yml` was referenced in index.md but the **file does not actually exist** in `.github/workflows/`
- Only `.github/copilot-instructions.md` exists

### Planned Pipeline (ci.yml)

```yaml
# Trigger: push/PR to main
# Steps: install → typecheck → lint → test → build
```

### Planned Publish Pipeline (publish.yml)

```yaml
# Trigger: tag v*
# Steps: install → typecheck → test → build (lib) → npm publish
```

## 📝 Build Scripts (Current)

| Script      | Command          | Status   |
| ----------- | ---------------- | -------- |
| `dev`       | `vite`           | ✅ Works |
| `build`     | `vite build`     | ✅ Works |
| `test`      | (not configured) | 🔴 TODO  |
| `lint`      | (not configured) | 🔴 TODO  |
| `typecheck` | (not configured) | 🔴 TODO  |
