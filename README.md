# 🌥️ App Template

> Project Status: Maintenance Mode

This repository is in maintenance mode. We accept critical bug fixes, security patches, and CI/docs chores only. Feature requests are not in scope. To report a bug, please open a GitHub issue using the Bug Report template and review support expectations in SUPPORT.md.

[View Support Policy](SUPPORT.md) · [Security Policy](SECURITY.md)

> App Template is the official web interface for the **Pillowstack** ecosystem — built with **Vue 3** and **Vite**, optimized for speed, modularity, and scalability. Now with ready-to-use mobile app integration via **Capacitor**.

---

## 📦 Features

- ⚡ **Vite** for ultra-fast development.
- 🎨 **Vue 3 + TypeScript** with strict typing.
- 📱 **Capacitor** to package as a mobile app (iOS/Android).
- 🧩 Modular architecture to scale easily.
- 🛡️ **ESLint + Prettier** for clean and consistent code.
- ✅ **Vitest** and **Playwright** for unit and E2E tests.
- 🔒 Designed for private use and secure deployment.

---

## 🛠️ Prerequisites

- **Node.js** `>=20`
- **npm** `>=9` (or **pnpm/yarn**)
- **Capacitor** (`@capacitor/core`, `@capacitor/cli`) for mobile integration.

---

## 🚀 Installation

```sh
npm install
```

---

## 📱 Capacitor Integration

1. **Install Capacitor**
   ```sh
   npm install @capacitor/core @capacitor/cli
   ```
2. **Initialize Capacitor**
   ```sh
   npx cap init vasa.app-dev me.vasa.app-dev
   ```
3. **Add platforms**
   ```sh
   npx cap add android
   npx cap add ios
   ```
4. **Build the web app**
   ```sh
   npm run build
   ```
5. **Sync files**
   ```sh
   npx cap sync
   ```
6. **Open in Android Studio or Xcode**
   ```sh
   npx cap open android
   npx cap open ios
   ```

### Example of using Capacitor in Vue

```ts
// src/composables/useDevice.ts
import { Device } from "@capacitor/device";
import { ref } from "vue";

export function useDeviceInfo() {
  const device = ref(null);
  const getDevice = async () => {
    device.value = await Device.getInfo();
  };
  return { device, getDevice };
}
```

```vue
<script setup lang="ts">
import { useDeviceInfo } from "@/composables/useDevice";
const { device, getDevice } = useDeviceInfo();
onMounted(getDevice);
</script>
<template>
  <pre>{{ device }}</pre>
</template>
```

---

## 💻 Available Scripts

| Command                    | Description                               |
| -------------------------- | ----------------------------------------- |
| `npm run dev`              | Start development server with hot reload. |
| `npm run build`            | Build and minify for production.          |
| `npm run preview`          | Preview the production build locally.     |
| `npm test`                 | Run unit tests with coverage (alias).     |
| `npm run test:unit`        | Run unit tests with coverage (Vitest).    |
| `npm run test:e2e`         | Run end-to-end tests with Playwright.     |
| `npm run lint`             | Lint and fix code with ESLint.            |
| `npx cap sync`             | Sync the web app with Capacitor.          |
| `npx cap open android/ios` | Open in the corresponding IDE.            |

---

## 🧪 Testing

### Unit Tests (Vitest)

```sh
npm run test:unit
```

Generates coverage reports in `coverage/` (HTML, text, lcov). Open `coverage/index.html` locally to inspect detailed file coverage, or consume `coverage/lcov.info` in external tools.

### End-to-End (Playwright)

```sh
npx playwright install # first run only
npm run build
npm run test:e2e
```

Options:

```sh
npm run test:e2e -- --project=chromium
npm run test:e2e -- tests/example.spec.ts
npm run test:e2e -- --debug
```

---

## 🔐 Environment Variables and Secrets (GitHub Actions)

This project uses Vite and reads variables with the `VITE_*` prefix on the client (`import.meta.env.*`) and `process.env.*` during build/configuration. In CI, these variables must be defined as GitHub Action Secrets.

### Required/Optional Variables

- VITE_APP_NAME: Application name. Required. Also used by Capacitor.
- VITE_APP_VERSION: App version (semver). Required.
- VITE_APP_ENV: Environment (`development` | `staging` | `production`). Required.
- VITE_API_URL: Base API URL (https). Required.
- VITE_API_WS_URI: API WebSocket URL (wss). Required.
- VITE_APPLE_TEAM_ID: Apple Developer Team ID. Required.
- VITE_APPLE_BUNDLE_ID: App Bundle ID. Required.
- VITE_APPLE_SERVICE_ID: Service ID for Sign in with Apple (web). Required for web login.
- VITE_APPLE_REDIRECT_URI: Redirect URI configured in the backend/Apple. Required.
- VITE_APPLE_SCOPE: Requested scopes (e.g., `name email`). Required.
- VITE_SENTRY_DSN: Sentry DSN for runtime client errors. Optional but recommended in production.
- SENTRY_ORG: Sentry organization. Required if uploading sourcemaps in CI.
- SENTRY_PROJECT: Sentry project. Required if uploading sourcemaps in CI.
- SENTRY_AUTH_TOKEN: Sentry token for uploading sourcemaps (typical scopes: `project:write`, `org:read`). Required if uploading sourcemaps in CI.
- SERVER_ORIGIN: Public origin used by the dev/preview server. Optional.
- SERVER_ALLOWED_HOSTS: Comma-separated list of allowed hosts. Optional.
- PKG_GH_READ: GitHub token with `read:packages` (and `repo` if applicable). Used by CI to authenticate `npm ci` against GitHub Packages (injected as `NODE_AUTH_TOKEN`).
- GITHUB_TOKEN: Automatically provided by GitHub Actions (no configuration required). Used by the PR title verification workflow.

Usage Notes:

- The Sentry plugin in `vite.config.ts` runs during `build` and requires `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, and `SENTRY_PROJECT` to upload sourcemaps. If Sentry is not needed in CI, configure these secrets anyway (with valid values) or adapt the pipeline outside of maintenance.
- The Vite server uses `VITE_SERVER_*` only in development/preview; they are optional for build.

### How to Configure GitHub Action Secrets

Option A — from the web interface:

- Repository Settings → Secrets and variables → Actions → New repository secret → add each key above with its value.

Option B — with GitHub CLI (`gh`):

- Run these commands from the repo root, replacing the example values with your own.

```sh
# Netlify
gh secret set NETLIFY_AUTH_TOKEN --body "<body>"
gh secret set NETLIFY_SITE_ID --body "<body>"

# Sentry
gh secret set SENTRY_AUTH_TOKEN --body "<body>"
gh secret set SENTRY_ORG --body "<body>"
gh secret set SENTRY_PROJECT --body "<body>"

# GitHub Packages (CI)
# GH PAT with scope read:packages (workflow injects it as NODE_AUTH_TOKEN)
gh secret set PKG_GH_READ --body "ghp_..."
```

---

## 📂 Project structure

```plaintext
app-template/
 ├─ public/          # Static assets
 ├─ src/
 │   ├─ assets/      # Images, global styles
 │   ├─ components/  # Reusable components
 │   ├─ composables/ # Reusable logic
 │   ├─ router/      # Route configuration
 │   ├─ store/       # Global state
 │   ├─ views/       # Main views
 │   └─ main.ts      # Entry point
 ├─ tests/           # Unit and e2e tests
 ├─ capacitor.config.ts # Capacitor configuration
 └─ vite.config.ts   # Vite configuration
```

---

## 📜 License

Private — All rights reserved.

---

❤️ Made with care by **Vasa**
