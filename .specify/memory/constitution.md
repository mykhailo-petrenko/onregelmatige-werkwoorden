<!--
Sync Impact Report

Version change: TODO -> 1.0.1
Modified principles: none renamed; concrete values supplied for all placeholders
Added sections: none
Removed sections: none
Templates requiring updates: .specify/templates/plan-template.md (✅ reviewed), .specify/templates/spec-template.md (✅ reviewed), .specify/templates/tasks-template.md (✅ reviewed), .specify/templates/checklist-template.md (⚠ pending - review suggested), .specify/templates/agent-file-template.md (✅ reviewed)
Follow-up TODOs: If RATIFICATION_DATE unknown, please confirm and replace TODO(RATIFICATION_DATE)
--> 

# Onregelmatige Werkwoorden Constitution

## Core Principles

### 1. Learner-first design
All product and technical decisions MUST prioritize clear, testable learning outcomes for Dutch irregular verbs ("onregelmatige werkwoorden"). UI and data changes that affect a learner's progress tracking or assessment MUST be backwards compatible or accompanied by a documented migration plan.

### 2. Single-source-of-truth data
The canonical source for verb data is the `data/onregelmatige-werkwoorden.json` file in this repository. Any transformation, export, or derived artifact MUST be reproducible from that source using checked-in scripts in `data/`.

### 3. Test-before-change (NON-NEGOTIABLE)
All behavior that affects user-visible learning status, scoring, or persistence MUST include automated tests before implementation (unit or integration as appropriate). Tests must be included in the same PR that implements the change.

### 4. Minimal, observable UX
Interfaces (web UI or export scripts) MUST be simple, clearly observable, and produce actionable logs or deterministic output. Exports (CSV/JSON) MUST be reproducible and include version metadata.

### 5. Semantic versioning for data and UI
Public artifacts (released web-ui versions, exported data sets) MUST follow semantic versioning. Breaking changes to data schema or learning semantics MUST increment the MAJOR version and include a migration guide.

## Data & Security Constraints

Data files containing verb lists, levels and user progress are stored in `data/` and `web-ui/public/assets/`. Personal user data (if added) MUST be stored separately and documented with retention rationale. No secrets or credentials should be committed to the repository.

## Development Workflow

All changes flow through feature branches, PR reviews and CI. Every PR that affects user-visible behavior MUST reference the relevant sections of this constitution in its description and include tests. Linting and basic build checks for `web-ui/` are expected on PRs; maintainers can require additional checks as needed.

## Governance

Amendments to this constitution require a documented change in the file and a PR reviewed and approved by an active maintainer. Minor wording clarifications MAY be applied as PATCH updates; adding new principles or altering existing principles' semantics is a MINOR update; removing or reinterpreting principles is a MAJOR update.

**Version**: 1.0.1 | **Ratified**: TODO(RATIFICATION_DATE) | **Last Amended**: 2025-11-12
<!-- Example: Constitution supersedes all other practices; Amendments require documentation, approval, migration plan -->
