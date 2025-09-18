import fs from 'node:fs';
import { argv } from 'node:process';

const list_file = argv[2];

if (!list_file) {
  console.error('please provide file');
}

const content = fs.readFileSync(list_file);

const list = content.toString().split('\n').filter(w => w?.length);

console.log(JSON.stringify(list));
