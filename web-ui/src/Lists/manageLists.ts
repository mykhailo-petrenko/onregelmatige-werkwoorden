import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import type { VerbInfo, VerbList, VerbListPersistence, VerbListPersistenceCollection } from './types.ts';
import { DEFAULT_LISTS, WORD_BY_ID } from './words.ts';
import { useMemo } from 'react';
import { useAtom } from 'jotai';


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





