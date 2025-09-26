# Contributing

Thanks for your interest in improving this template. These guidelines keep changes
consistent, easy to review, and CI-friendly.

## Prerequisites

- Node.js 20+ and npm 9+
- Do not commit secrets. `.env` is ignored and CI uses GitHub Secrets.

## Setup

```bash
npm ci
npm run prepare  # installs Husky hooks
```

## Development Workflow

1. Create a focused branch (use Conventional Commits in the PR title):
   - Example: `feat: add xyz` → branch `codex/add-xyz` or similar
2. Make minimal, reviewable changes scoped to a single concern.
3. Run local checks:
   ```bash
   npm run format:check && npm run lint
   ```
4. Commit; pre-commit hooks will run formatting and linting on staged files.
5. Open a PR using the template and request appropriate reviewers (see CODEOWNERS).

## Code Style

- Formatting: Prettier with 100-character print width and 2-space indentation.
- Linting: ESLint v9 flat config with `@eslint/js` and `eslint-plugin-import`.
- Naming: kebab-case files, PascalCase types/classes, camelCase vars/functions,
  SCREAMING_SNAKE_CASE constants.
- Imports: prefer absolute or clean relative paths; group and sort consistently.

## Commits & PRs

- Conventional Commits for titles and messages: `feat:`, `fix:`, `docs:`, `chore:`, etc.
- Keep PRs small, focused, and incremental. Use the PR template and include how to test.
- Link issues in the description (e.g., `Closes #123`).

## CI

- CI runs `npm ci`, `npm run lint`, and `npm run format:check`.
- Ensure local checks pass before pushing to avoid red CI.

## Scope of This Repo

This is a minimal template.

## Questions

Leave an [message](https://github.com/pillowstack/.github/discussions) if anything is unclear or if you propose changes to the tooling.
