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
