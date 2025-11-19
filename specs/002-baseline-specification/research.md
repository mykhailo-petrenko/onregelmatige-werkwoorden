# Research: Phase 0 findings for Baseline Specification

R001: Testing framework choice

Decision: Use Vitest for unit and integration tests, and Playwright for optional e2e tests.

Rationale: The project is a TypeScript + Vite application. Vitest is fast, integrates seamlessly with Vite and TypeScript, and has first-class support for the ecosystem. Playwright provides robust cross-browser e2e testing when needed.

Alternatives considered:
- Jest: mature, but less tightly integrated with Vite; would require additional configuration.
- Cypress: good e2e, but Playwright offers broader multi-browser support for automation.

R002: Export format and provenance block

Decision: Primary export format: JSON (versioned) with optional CSV output for teacher-friendly consumption.

Provenance block schema (embedded in exported JSON):

{
  "schemaVersion": "1.0.0",
  "exportedAt": "2025-11-18T00:00:00Z",
  "sourceAppVersion": "web-ui@1.3.0"
}

Rationale: JSON is lossless and easy to validate; CSV provided as convenience for non-technical users.

R003: Import merging strategy

Decision: Import supports two modes: (A) overwrite (default for full imports), (B) merge by verbId with lastReviewedAt comparison for conflict resolution (optional advanced mode).

Rationale: Overwrite is simple and predictable for users who move between devices via export/import. Merge mode is useful for advanced users combining progress from multiple devices — implement as an explicit option in the import UI.

Next steps from research

- Implement Vitest configuration and example tests for Learn flow.
- Implement export JSON schema and sample export script under `web-ui/scripts/exports/` (or `data/exports/`).
- Implement import logic that supports overwrite and optional merge-by-timestamp mode.
