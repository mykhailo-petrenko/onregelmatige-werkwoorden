import type { VerbInfo } from './types.ts';

import ALL_WORDS_RAW from '../assets/werkwoorden.json';

export const ALL_WORDS: VerbInfo[] = ALL_WORDS_RAW as VerbInfo[];
export const WORD_BY_ID = new Map<string, VerbInfo>;
export const ALL_WORDS_IDS: string[] = [];

for (const verb of ALL_WORDS) {
  WORD_BY_ID.set(verb.id, verb);
  ALL_WORDS_IDS.push(verb.id);
}

