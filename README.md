# App Template

**Hybrid mobile app template using Vue 3, Vite, Capacitor and more**

[View Support Policy](SUPPORT.md) · [Security Policy](SECURITY.md)

---

## 🚀 About This Template

App Template is a modern hybrid mobile app template built with Vue 3, Vite, and Capacitor. It provides a solid foundation for building cross-platform applications with web technologies while maintaining native mobile app capabilities.

This template is designed to be:

- ⚡ **Fast** - Ultra-fast development with Vite and hot reload
- 🎨 **Modern** - Vue 3 + TypeScript with strict typing
- 📱 **Hybrid** - Deploy as web app or mobile app (iOS/Android)
- 🧩 **Modular** - Clean architecture that scales easily
- 🛡️ **Quality-focused** - ESLint, Prettier, Vitest, and Playwright
- 🔒 **Secure** - Designed for private use and secure deployment

---

## 📦 Features

- ⚡ **Vite** for ultra-fast development
- 🎨 **Vue 3 + TypeScript** with strict typing
- 📱 **Capacitor** to package as a mobile app (iOS/Android)
- 🧩 Modular architecture to scale easily
- 🛡️ **ESLint + Prettier** for clean and consistent code
- ✅ **Vitest** and **Playwright** for unit and E2E tests
- 🌐 **Vue I18n** for internationalization
- 🔐 **Apple Sign In** integration ready
- 📊 **Sentry** error tracking integration
- 🎯 **Pinia** for state management

---

## 🛠️ Prerequisites

- **Node.js** `>=20`
- **npm** `>=9` (or **pnpm/yarn**)
- **Capacitor CLI** for mobile integration

---

## 🚀 Quick Start

```sh
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

---

## 📱 Mobile Development

### Initial Setup

```sh
# Build the web app
npm run build

# Sync files with Capacitor
npx cap sync ios

# Install iOS dependencies
npm run "6. Pods"
```

### Development Workflow

```sh
# 1. Clean previous builds
npm run "1. Clean"

# 2. Build the app
npm run "2. Build"

# 3. Sync with Capacitor
npm run "3. Sync"

# 4. Install pod dependencies
npm run "6. Pods"
```

### Example: Using Capacitor in Vue

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

| Command              | Description                              |
| -------------------- | ---------------------------------------- |
| `npm run dev`        | Start development server with hot reload |
| `npm run build`      | Build and minify for production          |
| `npm run preview`    | Preview the production build locally     |
| `npm test`           | Run unit and E2E tests                   |
| `npm run test:unit`  | Run unit tests with Vitest               |
| `npm run test:e2e`   | Run end-to-end tests with Playwright     |
| `npm run lint`       | Lint and fix code with ESLint            |
| `npm run format`     | Format code with Prettier                |
| `npm run type-check` | Check TypeScript types                   |
| `npm run i18n:sync`  | Sync translation files                   |

---

## 🧪 Testing

### Unit Tests (Vitest)

```sh
npm run test:unit
```

Generates coverage reports in `coverage/`. Open `coverage/index.html` to inspect detailed coverage.

### End-to-End Tests (Playwright)

```sh
# Install browsers (first run only)
npx playwright install

# Run E2E tests
npm run test:e2e

# Run specific browser
npm run test:e2e -- --project=chromium

# Debug mode
npm run test:e2e -- --debug
```

---

## 🔐 Environment Configuration

This project uses environment variables for configuration. Create a `.env.local` file for local development:

### Required Variables

- `VITE_APP_NAME`: Application name
- `VITE_APP_VERSION`: App version (semver)
- `VITE_APP_ENV`: Environment (`development` | `staging` | `production`)
- `VITE_API_URL`: Base API URL (https)
- `VITE_API_WS_URI`: API WebSocket URL (wss)

### Apple Sign In (Required for authentication)

- `VITE_APPLE_TEAM_ID`: Apple Developer Team ID
- `VITE_APPLE_BUNDLE_ID`: App Bundle ID
- `VITE_APPLE_SERVICE_ID`: Service ID for Sign in with Apple
- `VITE_APPLE_REDIRECT_URI`: Redirect URI
- `VITE_APPLE_SCOPE`: Requested scopes (e.g., `name email`)

### Optional Variables

- `VITE_SENTRY_DSN`: Sentry DSN for error tracking
- `SENTRY_ORG`: Sentry organization (for CI sourcemap upload)
- `SENTRY_PROJECT`: Sentry project (for CI sourcemap upload)
- `SENTRY_AUTH_TOKEN`: Sentry authentication token (for CI)

### GitHub Actions Secrets

For CI/CD, configure these secrets in your GitHub repository:

```sh
# Using GitHub CLI
gh secret set NETLIFY_AUTH_TOKEN --body "<token>"
gh secret set NETLIFY_SITE_ID --body "<site-id>"
gh secret set SENTRY_AUTH_TOKEN --body "<token>"
gh secret set PKG_GH_READ --body "<github-token>"
```

---

## 📂 Project Structure

```plaintext
app-template/
├─ public/              # Static assets
├─ src/
│   ├─ components/      # Reusable Vue components
│   ├─ composables/     # Reusable composition functions
│   ├─ config/          # Configuration files
│   ├─ languages/       # i18n translation files
│   ├─ middleware/      # Route middleware
│   ├─ router/          # Vue Router configuration
│   ├─ services/        # API and external services
│   ├─ stores/          # Pinia stores
│   ├─ styles/          # Global SCSS styles
│   ├─ utils/           # Utility functions
│   ├─ views/           # Main application views
│   └─ main.ts          # Application entry point
├─ e2e/                 # Playwright E2E tests
├─ ios/                 # iOS Capacitor project
├─ scripts/             # Build and utility scripts
└─ capacitor.config.ts  # Capacitor configuration
```

---

## 🔹 Related Templates

- [**backend-template**](https://github.com/pillowstack/backend-template) - Minimal, opinionated starter kit for modern Node.js backends
- [**shared-template**](https://github.com/pillowstack/shared-template) - Shared styles and types for web and mobile projects
- [**landing-template**](https://github.com/pillowstack/landing-template) - Vite-based landing page template with GitHub Pages deploy
- [**design-template**](https://github.com/pillowstack/design-template) - Design system scaffold with SCSS, linting, formatting, and CI

---

## 🤝 Contributing

We welcome contributions to any of our repositories! Check each project's README and CONTRIBUTING.md for specific guidelines.

## 📫 Contact

- Discussions: [Pillowstack](https://github.com/pillowstack/.github/discussions)
- GitHub: [@pillowstack](https://github.com/pillowstack)
- Website: [pillowstack.dev](https://pillowstack.dev) <!-- ✅ Verified as accessible and properly configured as of 2025-06 -->
  <!-- Maintainers: If updating this URL, please verify accessibility and configuration before publishing. -->

---

<div align="center">

**© 2025 Pillowstack**

</div>
