# Export Schema: JSON + CSV guidance

Primary export: versioned JSON. The JSON export MUST contain two top-level keys: `meta` and `progress`.

Example JSON structure:

{
  "meta": {
    "schemaVersion": "1.0.0",
    "exportedAt": "2025-11-18T00:00:00Z",
    "sourceAppVersion": "web-ui@1.3.0"
  },
  "progress": [
    {
      "verbId": "1",
      "bucket": 3,
      "lastReviewedAt": "2025-11-18T09:12:34Z",
      "correctCount": 10,
      "incorrectCount": 2
    }
  ]
}

CSV guidance: Provide a CSV with columns: verbId, bucket, lastReviewedAt, correctCount, incorrectCount. Include a generated metadata file or header comment with schemaVersion and exportedAt.

Import behavior: Imports SHOULD accept JSON exports produced by the same or newer schema. The import CLI/UI will offer 'overwrite' and 'merge' modes; mergers match progress by `verbId` and prefer the record with the more recent `lastReviewedAt` unless the user explicitly chooses overwrite.
