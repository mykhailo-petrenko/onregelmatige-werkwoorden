# Tasks: Baseline Project Specification

**Input**: plan.md, spec.md, data-model.md, contracts/export-schema.md

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Update `web-ui/package.json` to add a test script for Vitest and devDependencies (vitest, @testing-library/react)
- [ ] T002 Create `web-ui/vitest.config.ts` with basic Vitest configuration for Vite + TypeScript
- [ ] T003 Add `web-ui/scripts/exports/export-progress.js` (stub) that reads local progress and writes versioned JSON to disk
- [ ] T004 Add `web-ui/scripts/exports/import-progress.js` (stub) that imports versioned JSON and supports overwrite/merge modes
- [ ] T005 Add `specs/002-baseline-specification/quickstart.md` instructions (ensure export/import commands are documented)

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infra that MUST be complete before any user story work

- [ ] T006 [P] Review and update `data/export-to-csv.js` to ensure it produces reproducible exports with `schemaVersion` metadata
- [ ] T007 [P] Create/Update `web-ui/src/Lists/types.ts` to include `UserProgress` type with provenance block `{ schemaVersion, exportedAt, sourceAppVersion }`
- [ ] T008 [P] Add a CI workflow `.github/workflows/ci.yml` that installs deps and runs the `test` script (Vitest) on PRs
- [ ] T009 [P] Review `specs/002-baseline-specification/contracts/export-schema.md` and lock schemaVersion in plan

## Phase 3: User Story 1 - Learn single verb (Priority: P1) 🎯

**Goal**: Implement the Learn flow and local persistence

**Independent Test**: Open Learn view, answer a verb prompt, verify progress bucket updates and persisted data file is updated or exportable.

- [ ] T010 [US1] Implement Learn UI behavior in `web-ui/src/VerbTrainer/VerbTrainer.tsx` to present verbs and accept answers
- [ ] T011 [US1] Implement per-word progress update logic in `web-ui/src/VerbTrainer/VerbTrainerCard.tsx` (bucket +/-1 rules)
- [ ] T012 [US1] Implement local persistence API in `web-ui/src/Lists/statsStorage.ts` (read/write local storage and exportable form)
- [ ] T013 [US1] Add unit tests `web-ui/tests/unit/learn.test.ts` to validate bucket transitions and persistence logic
- [ ] T014 [US1] Add integration test `web-ui/tests/integration/learn-flow.spec.ts` (optional, e2e with Playwright)

## Phase 4: User Story 2 - Review all words table (Priority: P2)

**Goal**: All Words table with filters and ability to add/remove words from learning list

**Independent Test**: Open All Words view and verify filters by CEFR level, per-word progress visualization, and add/remove actions update storage.

- [ ] T015 [US2] Implement All Words table UI updates in `web-ui/src/pages/AllVocabularyPage.tsx` (show status and level)
- [ ] T016 [US2] Implement filtering logic in `web-ui/src/Lists/words.ts` or UI component (CEFR level filters)
- [ ] T017 [US2] Implement performance optimizations (pagination or virtualization) in `web-ui/src/ListsEditor/VerbListTable.tsx`
- [ ] T018 [US2] Add unit tests `web-ui/tests/unit/allwords.test.ts` covering filtering and add/remove behavior

## Phase 5: User Story 3 - Export / reproducible data (Priority: P3)

**Goal**: Author export/import scripts that produce versioned, reproducible JSON/CSV and import safely

**Independent Test**: Run `node web-ui/scripts/exports/export-progress.js` to generate `progress-<date>.json`, then run import to restore the data into local storage in overwrite and merge modes.

- [ ] T019 [US3] Implement `web-ui/scripts/exports/export-progress.js` to produce JSON matching `contracts/export-schema.md`
- [ ] T020 [US3] Implement `web-ui/scripts/exports/import-progress.js` to support `overwrite` and `merge` (merge by `lastReviewedAt`) modes
- [ ] T021 [US3] Add unit tests `web-ui/tests/unit/export.test.ts` to validate exported JSON structure and import behavior
- [ ] T022 [US3] Update `specs/002-baseline-specification/quickstart.md` to include export/import example commands

## Phase N: Polish & Cross-Cutting Concerns

- [ ] T023 Polish: Update top-level `README.md` with a short section about export/import and local persistence (include example commands and privacy note)
- [ ] T024 Polish: Add a short migration guide `docs/migrations.md` template to describe future MAJOR schema changes and import-migration steps

## Dependencies & Execution Order

- Foundation (Phase 2) MUST complete before Phase 3 and Phase 4 work.
- Phase 3 (US1) is the recommended MVP: complete T010-T014 first.
- Phase 4 (US2) can proceed after Phase 2; many tasks are parallelizable (marked [P]).

## Parallel opportunities

- T006, T007, T008, T009 (foundational setup) can be worked on in parallel.
- Within US1, tests (T013) and UI wiring (T010-T012) can be developed in parallel by different engineers.

## Task counts & summary

- Total tasks: 24
- Tasks by story:
  - Setup/Foundational: 9
  - US1 (Learn): 5
  - US2 (All Words): 4
  - US3 (Export): 4
  - Polish: 2

## Implementation Strategy

1. MVP: Implement US1 (T010-T014) so users can practice verbs and have local persistence.
2. Add export/import scripts (T019-T021) so users can move progress between devices.
3. Implement All Words table and filters (T015-T018).
4. Add CI and tests (T008, T013, T018, T021) to ensure quality.

## Files created/modified by tasks (high-level)

- `web-ui/package.json` (add test script & devDependencies)
- `web-ui/vitest.config.ts`
- `web-ui/scripts/exports/export-progress.js`
- `web-ui/scripts/exports/import-progress.js`
- `web-ui/src/VerbTrainer/VerbTrainer.tsx`
- `web-ui/src/VerbTrainer/VerbTrainerCard.tsx`
- `web-ui/src/Lists/statsStorage.ts`
- `web-ui/src/Lists/types.ts`
- `web-ui/src/pages/AllVocabularyPage.tsx`
- `web-ui/src/Lists/words.ts`
- `web-ui/src/ListsEditor/VerbListTable.tsx`
- `web-ui/tests/unit/*.test.ts`
- `.github/workflows/ci.yml`
- `specs/002-baseline-specification/quickstart.md`
