# Onregelmatige Werkwoorden Trainer

Goal is to learn "Onregelmatige Werkwoorden" via sort of Flash Cards with syntax checker (spell checker).

Source is [data/source-werkwoorden.json].

```json5
[
  [
    "bakken",       # Infinitief
    "bak|bakt",     # Presens (Tegenwordige Tijd)
    "bakte|bakten", # Imperfectum (Verleden tijd)
    "gebakken",     # Perfectum (Voltooiid deelword)
    "to bake|..."   # Vertalling
  ],
  # ...
]
```

## Parse
```js
let rows = $0.getElementsByTagName('tr')
let selectedRows = [...rows].filter(row => ![...row.getElementsByTagName('td')].some(td => td.hasAttribute('colspan')))
let werkworden = [...selectedRows].map(row => [...row.getElementsByTagName('td')].map(col => col.innerText))
console.log(JSON.stringify(werkworden, null, 2))
```