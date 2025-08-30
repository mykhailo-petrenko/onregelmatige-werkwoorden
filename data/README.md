# Onregelmatige Werkworden

## Ready for use `onregelmatige-werkworden.json`

```json5
[
  {
    "id": 1,
    "infinitive": "bakken",
    "imperfectum": [
      "bakte",
      "bakten"
    ],
    "perfectum": [
      "gebakken"
    ],
    "vertaling": "to bake, to fry",
    "hulpWerkwoorden": [
      "hebben"
    ]
  } # ,
  # ...
]
```

## Sources and Parsers

- `nt2-worden.txt` - words with hulp werkwoorden (zijn, hebben). The list is not full.
- `source-werkwoorden.json` - words list without hulp werkwoorden, but contains more words.
- `parse-hulpwerkwoorden.js` - converts `nt2-worden.txt` to json file with only infinitief and help words.
- `parse-werkworden.js` - takes info from two lists and forms `onregelmatige-werkworden.json`.

