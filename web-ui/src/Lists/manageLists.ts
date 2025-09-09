import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import type { VerbInfo, VerbList, VerbListPersistence, VerbListPersistenceCollection } from './types.ts';
import { ALL_WORDS_IDS, WORD_BY_ID } from './words.ts';
import { useMemo } from 'react';
import { useAtom } from 'jotai';


const ALL = ALL_WORDS_IDS;
const A1 = ['70', '83', '98', '128', '135', '152', '337', '348', '350'];
const MY = ['12', '47', '52', '60', '68', '70', '71', '83', '97', '98', '116', '128', '135', '139', '140', '152', '153', '316', '332', '337', '350', '354', '355'];

const DEFAULT_LISTS: VerbListPersistenceCollection = [
  {
    label: 'ALL',
    items: ALL,
  },
  {
    label: 'A1',
    items: A1,
  },
  {
    label: 'MY',
    items: MY,
  }
];

export const myListsPersistence = atomWithStorage<VerbListPersistenceCollection>(
  'myVerbLists',
  DEFAULT_LISTS,
  createJSONStorage(),
  { getOnInit: true }
);

export function extractList(list: string[]): VerbInfo[] {
  return list.map(id => WORD_BY_ID.get(id)).filter(w => !!w);
}

export function useExtractList(list: VerbListPersistence | null): VerbList | null {
  return useMemo(() => {
    if (!list) {
      return null;
    }

    return {
      label: list.label,
      items: extractList(list.items),
    } as VerbList;
  }, [list]);
}

export function useListPersistenceById(id?: string): VerbListPersistence | null {
  const [lists, ] = useAtom(myListsPersistence);

  const index = parseInt(id || "-1", 10);

  return lists[index] || null;
}

export function useListById(id?: string): VerbList | null {
  const list = useListPersistenceById(id);

  return useExtractList(list);
}





