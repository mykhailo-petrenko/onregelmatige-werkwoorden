import { useCallback, useEffect } from 'react';
import { useAtom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import type { VerbInfo, VerbListPersistence } from './types.ts';
import { ALL_WORDS_IDS } from './words.ts';
import { useExtractList, useListPersistenceById } from './manageLists.ts';


const DEFAULT_WORDS_LIST: VerbListPersistence = {
  id: '0',
  label: 'All',
  items: ALL_WORDS_IDS,
};

export const currentWerkWord = atomWithStorage<VerbInfo | null>(
  'currentWerkWord',
  null,
  createJSONStorage(),
  { getOnInit: true }
);

export function useNextWordCallback() {
  const [, setCurrentWord] = useAtom(currentWerkWord);
  const [currentListPersistence, ] = useAtom(currentWordList);
  const currentList = useExtractList(currentListPersistence);

  return useCallback(() => {
    if (!currentList) {
      return;
    }

    const N = currentList.items.length - 1;
    const nextIndex = Math.round(Math.random() * N);

    setCurrentWord(currentList.items[nextIndex]);
  }, [setCurrentWord, currentList]);
}


export const currentWordList = atomWithStorage<VerbListPersistence>(
  'currentWordsList',
  DEFAULT_WORDS_LIST,
  createJSONStorage(),
  { getOnInit: true }
);

export function useWordListProvider() {
  const [currentWord, setCurrentWord] = useAtom(currentWerkWord);
  const [currentListPersistence, ] = useAtom(currentWordList);

  const currentList = useExtractList(currentListPersistence);

  return useEffect(() => {
    if (currentWord) {
      return;
    }

    setCurrentWord(currentList?.items[0] || null);
  }, [currentList, currentWord, setCurrentWord]);
}

export function useCurrentLearnList() {
  const [currentListPersistence, ] = useAtom(currentWordList);
  return useExtractList(currentListPersistence);
}

export function useLearnList(id?: string) {
  const [, setCurrentWordList ] = useAtom(currentWordList);
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
