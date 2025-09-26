# Project Summary: @pillowstack/app-template

## 📋 General Information

**Name:** @pillowstack/app-template  
**Version:** 0.1.0  
**Description:** Frontend application developed with Vue.js, Vite and Pinia  
**Status:** Maintenance Mode  
**Type:** Private application from Pillowstack ecosystem

## 🏗️ Technical Architecture

### Main Stack

- **Frontend Framework:** Vue 3 with TypeScript
- **Build Tool:** Vite 7.0.0
- **Global State:** Pinia 3.0.3
- **Router:** Vue Router 4.5.1
- **Internationalization:** Vue i18n 11.1.11
- **Mobile:** Capacitor 7.4.2 (iOS/Android)

### Development Tools

- **Linting:** ESLint 9.29.0 with Vue/TypeScript configuration
- **Formatting:** Prettier 3.6.2
- **Styling:** Sass/SCSS with Stylelint
- **Testing:** Vitest (unit) + Playwright (E2E)
- **Git Hooks:** Husky + lint-staged

### Featured Dependencies

- **@pillowstack/shared-template:** 0.3.1 (shared ecosystem library)
- **@capacitor-community/apple-sign-in:** 7.0.1 (Apple authentication)
- **@sentry/vue:** 10.1.0 (error monitoring)
- **axios:** 1.11.0 (HTTP client)
- **gsap:** 3.13.0 (animations)
- **lucide-vue-next:** 0.539.0 (icons)
- **zod:** 4.0.15 (schema validation)

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── auth/           # Authentication components
│   └── __tests__/      # Component tests
├── composables/        # Reusable logic (useSetUser, useSyncUser)
├── config/             # Centralized configurations
│   ├── default/        # Default values
│   ├── options/        # Available options
│   └── storage-keys/   # LocalStorage keys
├── languages/          # Translation files (en, es, sr)
├── middleware/         # Route guards (authGuard)
├── plugins/            # Plugins (WebSocket)
├── router/             # Modular route configuration
├── services/           # Services (httpClient)
├── stores/             # Global state with Pinia
│   ├── auth.ts         # Authentication
│   ├── profile/        # User profile
│   ├── settings/       # Settings
│   └── ui/             # UI state
├── styles/             # Global SCSS styles
├── utils/              # Utilities (errorHandler, performance)
└── views/              # Main pages
    ├── Auth/           # Authentication views
    └── Settings/       # Settings views
```

## 🔧 Main Features

### Authentication

- **Apple Sign-In:** Complete integration for web and native
- **Route Guards:** Automatic protection of private routes
- **Token Management:** Secure storage in localStorage
- **Local Mode:** Development without authentication

### Internationalization

- **Supported Languages:** English (en), Spanish (es), Serbian (sr)
- **Automatic Sync:** Between store and i18n
- **Persistence:** Configuration saved in localStorage

### Theming

- **Available Themes:** Light, Dark, High Contrast (Light/Dark)
- **System Theme:** Automatic system theme detection
- **Persistence:** Configuration saved in localStorage

### Mobile (Capacitor)

- **Platforms:** iOS and Android
- **Configuration:** Bundle ID and App Name via environment variables
- **Sync:** Automated scripts for build and sync

## 🛠️ Main Scripts

### Development

- `npm run dev` - Development server with hot reload
- `npm run build` - Production build
- `npm run preview` - Build preview

### Testing

- `npm run test:unit` - Unit tests with Vitest
- `npm run test:e2e` - E2E tests with Playwright

### Code Quality

- `npm run lint` - Linting with ESLint
- `npm run format` - Formatting with Prettier
- `npm run lint:style` - Style linting

### Capacitor

- `npx cap sync ios` - Sync with iOS
- `npx cap open ios` - Open in Xcode

## 🔒 Security and Monitoring

### Sentry Integration

- **Error Monitoring:** Configured for production
- **DSN:** Integrated with Pillowstack project
- **PII Data:** Configured to send identification data

### Environment Variables

- **VITE_APP_ENV:** Application environment
- **VITE_APPLE_BUNDLE_ID:** Bundle ID for iOS
- **VITE_APP_NAME:** Application name
- **SENTRY_ORG/PROJECT:** Sentry configuration

## 🔄 Project Status

### Maintenance Mode

- **Policy:** Only critical fixes and security patches accepted
- **Scope:** No new features accepted
- **Support Policy:** Defined in SUPPORT.md
- **Security Policy:** Defined in SECURITY.md

### CI/CD Flow

- **Lint and Format:** Automatic validation
- **Tests:** Conditional based on availability
- **Node Version:** >= 20
- **Husky Hooks:** Pre-commit with lint-staged

## 💡 Featured Technical Characteristics

### Performance

- **Lazy Loading:** Routes loaded on demand
- **Tree Shaking:** Automatic optimization with Vite
- **Error Handling:** Centralized error handling system
- **WebSocket Support:** Integrated plugin for real-time

### Modularity

- **Modular Stores:** Each functionality in its own store
- **Composables:** Reusable logic extracted
- **Centralized Config:** Configurations organized by domain
- **Modular Routing:** Routes organized by functionality

### Accessibility

- **High Contrast Themes:** Support for users with special needs
- **Complete i18n:** Fully translatable interface
- **Semantic HTML:** Proper semantic structure

## 🎯 Main Use Cases

1. **Web Application:** Complete interface in browser
2. **iOS App:** Native packaging with Capacitor
3. **Android App:** Native packaging with Capacitor
4. **Local Development:** Development mode without authentication
5. **Multi-language:** Support for multiple markets
6. **Dynamic Theming:** Real-time theme switching

This project represents a solid and well-structured foundation for Pillowstack ecosystem applications, with focus on modularity, performance, and cross-platform user experience.
