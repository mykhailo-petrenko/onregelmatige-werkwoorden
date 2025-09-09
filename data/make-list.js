import fs from 'node:fs';

const all = JSON.parse(fs.readFileSync('onregelmatige-werkwoorden.json'));

const a1 = ['zijn', 'hebben', 'gaan', 'komen', 'doen', 'zien', 'kunnen', 'willen', 'moeten',];

const my = ["beginnen", "bewegen", "bezoeken", "blijven", "denken", "doen", "dragen", "gaan", "hangen", "hebben", "houden", "komen", "kunnen", "laten", "lezen", "moeten", "mogen", "vinden", "weten", "willen", "zijn", "zitten", "zoeken"];


function getIds(list) {
  const set = new Set(list);

  return all
    .filter((w) => {
      return set.has(w.infinitive);
    })
    .map((w) => {
      return w.id;
    });
}

console.log(JSON.stringify(getIds(my)));
