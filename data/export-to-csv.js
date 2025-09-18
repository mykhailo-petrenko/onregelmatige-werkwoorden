import { argv, exit } from 'node:process';
import fs from 'node:fs';

const db = argv[2]

if (!db) {
  console.error(`Please pass json file as a parameter`);
  exit(1);
}

const wordsRaw = fs.readFileSync(db);

const rows = JSON.parse(wordsRaw);

for (const row of rows) {
  console.log(`"${row.id}", "${row.infinitive}", "${row.imperfectum.join(',')}", "${row.perfectum.join(',')}", "${row.hulpWerkwoorden.join(',')}"`);
}
