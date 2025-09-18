import type { VerbInfo, VerbListPersistenceCollection } from './types.ts';

import ALL_WORDS_RAW from '../assets/werkwoorden.json';
import DEFAULT_LISTS_RAW from '../assets/default_lists.json';

export const ALL_WORDS: VerbInfo[] = ALL_WORDS_RAW as VerbInfo[];
export const WORD_BY_ID = new Map<string, VerbInfo>;

for (const verb of ALL_WORDS) {
  WORD_BY_ID.set(verb.id, verb);
}
export const DEFAULT_LISTS: VerbListPersistenceCollection = DEFAULT_LISTS_RAW as VerbListPersistenceCollection;
