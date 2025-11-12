# Onregelmatige Werkwoorden Trainer

Goal is to learn "Onregelmatige Werkwoorden" via sort of Flash Cards with syntax checker (spell checker).

## Method
Let's use [Spaced repetition](https://en.wikipedia.org/wiki/Spaced_repetition).

We have 5 "Boxes" (Frequent boxes): 1 - most frequent (less known words), 2, 3, 4, 5 - less frequent (most known words).

Each world assign to the 1st Box. After correct answer move to the Box number +1, after each incorrect answer move to -1.

### Store answer statistics and word-to-bucket relation


## Build
```shell
cd web-ui/

./docker_build.sh
./docker_push.sh
```

## TODO:
### 1.4.0
#### All words list
Should be the table (first page?) where should be visible all available words and their learning statuses.

Learning Status now stick to Frequency Buckets, where:
- `0` - Did not start yet, so basically it is no 0 bucket, but this abstraction indicates lack of data.
- `1` - Not learned (Or a lot of mistakes).
- `2`, `3`, `4` - Learning is on the way.
- `5` - Learned (Good known).

Table should have quick filters by levels (A1, A2, B1, B2, C1, C2, ...).

There should be ability to add in a current learning list.

#### Active learning vocabulary
Words are selected to learn at this moment. Should be the lists total learning progressbar.

Progress for each single word (segmented progress bar) should be visible.

Should be abiliity to remove word from learning list.

From this list Learn component selecting next word to learn.

## Data
Source is [data/onregelmatige-werkwoorden.json].

```json5
[
  {
    "id": "1",
    // Infinitief
    "infinitive": "bakken",
    // Imperfectum (Verleden tijd)
    "imperfectum": [
      "bakte",
      "bakten"
    ],
    // Perfectum (Voltooid deelwoord)
    "perfectum": [
      "gebakken"
    ],
    // Vertaling
    "vertaling": "to bake, to fry",
    // Hulp Werkwoord(en): hebben of (en) zijn
    "hulpWerkwoorden": [
      "hebben"
    ]
  },
  // ... 
]
```

### Parse
```js
let rows = $0.getElementsByTagName('tr')
let selectedRows = [...rows].filter(row => ![...row.getElementsByTagName('td')].some(td => td.hasAttribute('colspan')))
let werkworden = [...selectedRows].map(row => [...row.getElementsByTagName('td')].map(col => col.innerText))
console.log(JSON.stringify(werkworden, null, 2))
```

### Speciy todo

2.1 /speckit.constitution - Establish project principles
2.2 /speckit.specify - Create baseline specification
2.3 /speckit.plan - Create implementation plan
2.4 /speckit.tasks - Generate actionable tasks
2.5 /speckit.implement - Execute implementation

Enhancement Commands 
Optional commands that you can use for your specs (improve quality & confidence)
/speckit.clarify (optional) - Ask structured questions to de-risk ambiguous areas before planning (run before /speckit.plan if used)
/speckit.analyze (optional) - Cross-artifact consistency & alignment report (after /speckit.tasks, before /speckit.implement)
/speckit.checklist (optional) - Generate quality checklists to validate requirements completeness, clarity, and consistency (after /speckit.plan)
