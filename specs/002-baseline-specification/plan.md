# Implementation Plan: Baseline Project Specification

**Branch**: `002-baseline-specification` | **Date**: 2025-11-18 | **Spec**: `spec.md`
**Input**: Feature specification from `spec.md`

## Summary

This plan covers delivering a baseline implementation for the Onregelmatige Werkwoorden Trainer: core Learn UI, local progress persistence with export/import, an All Words table, and reproducible export scripts. The plan prioritizes the Learner-first constitution principles: data provenance, test-before-change, and semantic versioning.

## Technical Context

**Language/Version**: TypeScript ~5.8 (project `web-ui/package.json`)

**Primary Dependencies**: React (~19.1.1), Vite (~7.1.5), MUI (~7.3.x), Jotai (state), @tanstack/react-table for tables. See `web-ui/package.json` for full list.

**Storage**: Hybrid — local browser storage (primary) + export/import scripts for portability. No server-side accounts in initial phase.

**Testing**: Vitest for unit tests and Playwright (or similar) for an optional e2e suite. [RESEARCH NOTE: chosen based on TypeScript + Vite ecosystem; see research.md for alternatives and rationale.]

**Target Platform**: Web (desktop & mobile web browsers).

**Performance Goals**: Load & render first 100 table entries in under 2s on a typical dev machine; single Learn interaction <30s.

**Constraints**: Must use canonical data in `data/onregelmatige-werkwoorden.json`; exports MUST be reproducible from `data/` scripts.

## Constitution Check

Gates (derived from `.specify/memory/constitution.md`) — the plan MUST provide:

- Data provenance: show how exports are generated from `data/onregelmatige-werkwoorden.json` (we will add scripts in `data/` and `web-ui/scripts/exports/`).
- Test-before-change: all user-visible behavior (Learn flow, persistence, exports) will have automated tests prior to feature merge (Vitest + basic CI checks).
- Versioning & Breaking Changes: any data schema changes will be treated as MAJOR and include a migration plan.
- Observability: exports include version metadata and logs provide clear, deterministic output for debugging.

## Project Structure

Deliverables in this feature directory:

```
specs/002-baseline-specification/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── export-schema.md
└── research.md
```

## Phase 0: Outline & Research

Objectives:

- Resolve open technical choices (testing framework, export format specifics, import merging strategy).
- Produce `research.md` with decisions and rationale.

Research tasks (each becomes an entry in research.md):

- R001: Choose testing framework(s) for TypeScript + Vite (candidate: Vitest).
- R002: Define export schema and provenance block (JSON primary, CSV optional).
- R003: Define import merging strategy (overwrite vs merge vs dedupe) and UI behavior.

Expected outputs: `research.md` with decisions and alternatives. All NEEDS_CLARIFICATION items resolved here.

## Phase 1: Design & Contracts

Prerequisite: `research.md` complete.

Deliverables:

- `data-model.md` — entity definitions (Verb, UserProgress, LearningList) and validation rules.
- `contracts/export-schema.md` — specification for exported JSON/CSV files including provenance metadata.
- `quickstart.md` — how to run dev environment and export/import scripts.

Agent context update: the plan will run `.specify/scripts/bash/update-agent-context.sh copilot` to refresh AI agent instructions with these choices.

## Phase 2: Implementation Tasks (high-level)

- T001 (P1) Implement Learn UI component and integrate local persistence API.
- T002 (P1) Implement export/import scripts under `web-ui/scripts/exports/` and `data/` with tests.
- T003 (P2) Implement All Words table with filters and performance optimizations.
- T004 (P2) Add unit tests (Vitest) and CI workflow to run tests on PRs.
- T005 (P3) Add optional e2e tests (Playwright) and import conflict UX improvements.

## Complexity Tracking

No large cross-cutting complexity identified. If server-backed sync is later added, reclassify as increased complexity and plan for backend and privacy requirements.

## Next steps

1. Complete Phase 0 research tasks in `research.md` (done below).
2. Run `.specify/scripts/bash/update-agent-context.sh copilot` to update agent files.
3. Create tasks.md from this plan and start T001 implementation.
