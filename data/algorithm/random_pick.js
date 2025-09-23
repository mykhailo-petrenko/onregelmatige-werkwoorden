const entities = [
  ["128", 3], ["135", 1], ["153", 5], ["337", 5], ["344", 1], ["350", 4], ["70", 2], ["83", 3], ["98", 2],
];

const BUCKETS = 5;

const propabilities = entities.map(([id, invertedProbability]) => {
  return (BUCKETS / invertedProbability);
});

const sum = propabilities.reduce((sum, p) => {
  return sum + p;
}, 0);


function pickEntity() {
  const target = Math.random() * sum;
  let acc = 0;

  for (let i=0; i<entities.length; i++) {
    acc += propabilities[i];
    if (acc>target) {
      return entities[i];
    }
  }

  return entities[entities.length-1];
}

const freq = {};

const N = 10000;

for (let i=0; i<N; i++) {
  const [id, bucket] = pickEntity();
  freq[id] = (freq[id] || 0) + 1;
}

entities.sort((a, b) => {
  return (a[1] - b[1]);
})

const stats = entities.map(([id, bucket]) => [id, bucket, freq[id], freq[id]/N]);


console.log(stats);
