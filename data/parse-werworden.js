import fs from 'node:fs';

let hulpwerkwoorden = fs.readFileSync('hulpwerkwoorden.json', 'utf8');
hulpwerkwoorden = JSON.parse(hulpwerkwoorden);

let source = fs.readFileSync('source-werkwoorden.json', 'utf8');
source = JSON.parse(source);

const hulpWerkwordenByInfinitief = new Map();

for (const [infinitief, hulp] of hulpwerkwoorden) {
  hulpWerkwordenByInfinitief.set(infinitief, hulp);
}

let outputRows = source.map(((row, index) => {
  let hulpWerkwoorden = hulpWerkwordenByInfinitief.get(row[0]) || null;

  if (hulpWerkwoorden) {
    hulpWerkwoorden = hulpWerkwoorden.map(w => {
      if (w === 'heb') return 'hebben';
      if (w === 'ben') return 'zijn';
      return w;
    })
  }

  return {
    id: (index + 1),
    infinitive: row[0],
    imperfectum: row[2].split('|'),
    perfectum: row[3].split('|'),
    vertaling: row[4].split('|').join(', '),
    hulpWerkwoorden
  };
}));


console.log(`Found: ${outputRows.filter(w => w.hulpWerkwoorden).length}`);
console.log(`Not found: ${outputRows.filter(w => !w.hulpWerkwoorden).length}`);
console.log(`Total: ${outputRows.length}`);

// @TODO: extract hebben / zijn for all werkworden.
// https://woordenlijst.org/zoeken/?q=bedragen

outputRows = outputRows.filter(w => w.hulpWerkwoorden);

fs.writeFileSync(
  'onregelmatige-werkworden.json',
  JSON.stringify(outputRows, null, 2)
);
