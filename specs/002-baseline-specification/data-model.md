# Data Model

Entities

1. Verb

Fields:
- id: string (canonical identifier from `data/onregelmatige-werkwoorden.json`)
- infinitive: string
- imperfectum: string[]
- perfectum: string[]
- vertaling: string
- hulpWerkwoorden: string[]

Validation:
- id must be present and unique
- infinitive must be non-empty
- imperfectum and perfectum arrays may contain multiple forms

2. UserProgress

Fields:
- verbId: string (FK to Verb.id)
- bucket: integer (0-5)
- lastReviewedAt: ISO timestamp
- correctCount: integer
- incorrectCount: integer
- provenance: { schemaVersion, exportedAt, sourceAppVersion } (optional, for exported files)

Validation:
- bucket MUST be in range 0..5
- lastReviewedAt MUST be a valid ISO timestamp

3. LearningList

Fields:
- id: string
- name: string
- verbIds: string[]

State transitions

- On correct answer: bucket := min(5, bucket + 1)
- On incorrect answer: bucket := max(0, bucket - 1)
