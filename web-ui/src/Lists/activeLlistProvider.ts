import { useCallback, useEffect, useMemo } from 'react';
import { useAtom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import type { VerbInfo, VerbListPersistence } from './types.ts';
import { DEFAULT_LISTS } from './words.ts';
import { useExtractList, useListPersistenceById } from './manageLists.ts';
import { MAX_BUCKET, MIN_BUCKET, useWordBuckets } from './statsStorage.ts';


const DEFAULT_WORDS_LIST: VerbListPersistence = DEFAULT_LISTS[0];

export const currentWerkWord = atomWithStorage<VerbInfo | null>(
  'currentWerkWord',
  null,
  createJSONStorage(),
  {getOnInit: true}
);

export function useNextWordCallback() {
  const [, setCurrentWord] = useAtom(currentWerkWord);
  const [currentListPersistence,] = useAtom(currentWordList);
  const currentList = useExtractList(currentListPersistence);
  const {getWordBucket} = useWordBuckets();

  return useCallback(() => {
    if (!currentList) {
      return;
    }

    const N = currentList.items.length - 1;

    const probability = new Array(N);
    let sum = 0;

    for (let i = 0; i < N; i++) {
      // invert buckets to requested "probabilities"
      probability[i] = MAX_BUCKET + MIN_BUCKET - getWordBucket(currentList.items[i].id);
      sum += probability[i];
    }

    const target = Math.floor(Math.random() * sum);
    let acc = 0;

    let nextIndex = N - 1;
    for (let i = 0; i < N; i++) {
      acc += probability[i];
      if (acc > target) {
        nextIndex = i;
        break;
      }
    }

    setCurrentWord(currentList.items[nextIndex]);
  }, [currentList, setCurrentWord, getWordBucket]);
}


export const currentWordList = atomWithStorage<VerbListPersistence>(
  'currentWordsList',
  DEFAULT_WORDS_LIST,
  createJSONStorage(),
  {getOnInit: true}
);

export function useWordListProvider() {
  const [currentWord, setCurrentWord] = useAtom(currentWerkWord);
  const [currentListPersistence,] = useAtom(currentWordList);

  const currentList = useExtractList(currentListPersistence);

  return useEffect(() => {
    if (currentWord) {
      return;
    }

    setCurrentWord(currentList?.items[0] || null);
  }, [currentList, currentWord, setCurrentWord]);
}

export function useCurrentLearnList() {
  const [currentListPersistence,] = useAtom(currentWordList);
  return useExtractList(currentListPersistence);
}

export function useIsInActiveList() {
  const currentList = useCurrentLearnList();

  const idSet = useMemo(() => {
    if (!currentList) return new Set<string>();
    return new Set(currentList.items.map(i => i.id));
  }, [currentList]);

  return useCallback((id: string) => {
    return idSet.has(id);
  }, [idSet]);
}

export function usedeleteWordFromCurrentList() {
  const [currentList, setCurrentList] = useAtom(currentWordList);

  return useCallback(function handleDelete(delete_id: string) {
    if (!currentList) return;
    const newItems = currentList.items.filter(id => id !== delete_id);
    setCurrentList({...currentList, items: newItems});
  }, [currentList, setCurrentList]);
}

export function useAddWordToCurrentList() {
  const [currentList, setCurrentList] = useAtom(currentWordList);

  return useCallback(function handleAdd(add_id: string) {
    if (!currentList) return;
    if (currentList.items.includes(add_id)) return;
    const newItems = [...currentList.items, add_id];
    setCurrentList({ ...currentList, items: newItems });
  }, [currentList, setCurrentList]);
}

export function useLearnList(id?: string) {
  const [, setCurrentWordList] = useAtom(currentWordList);
  const [, setCurrentWord] = useAtom(currentWerkWord);
  const listPersistence = useListPersistenceById(id);

  return useCallback(() => {
    if (!listPersistence) {
      return;
    }

    setCurrentWordList(listPersistence);
    setCurrentWord(null);
  }, [listPersistence, setCurrentWordList, setCurrentWord]);
}
