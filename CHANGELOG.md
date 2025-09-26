# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project adheres to Semantic Versioning.

## [Unreleased]

### Docs

- Add maintenance status notice to README.
- Add SECURITY.md and SUPPORT.md with policies.
- Update AGENTS.md with maintenance mode, support policy, cadence, dependency policy, backport policy, and change control.

### CI

- Update CI to run on push/pull_request with Node 20.
- Run `npm ci`, `npm run lint`, and `npm run format:check`.
- Conditionally run `npm test` if a test script exists.

### Chore

- Add bug report issue template and disable blank issues.
- Ensure `engines.node` is set to ">=20".
- Add `format:check` and `lint:fix` scripts to package.json.
- Brand residue audit added (no occurrences found).
