import fs from 'node:fs';

const nt2worden_file = fs.readFileSync('nt2-worden.txt', 'utf8');

const nt2worden = nt2worden_file.split('\n');

const zijn_hebben_info = nt2worden.map((row) => {
  row = row.trim();
  row = row.replaceAll('\t', '');
  row = row.replaceAll('(', '');
  row = row.replaceAll(')', '');
  row = row.split(' ');
  const infinitief = row[0];
  const hulpwerkwoorden = row[row.length-1].split(('/'));
  return [infinitief, hulpwerkwoorden];
});

fs.writeFileSync('hulpwerkwoorden.json', JSON.stringify(zijn_hebben_info, null, 2));

