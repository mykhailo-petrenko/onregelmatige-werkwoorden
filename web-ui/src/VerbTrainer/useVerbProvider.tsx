import { useCallback, useEffect, useState } from "react";
import type { VerbInfo, VerbList } from './VerbTypes';

import selected from '../assets/selected.json';
import werkworden from '../assets/werkwoorden.json';


const selectedDictionary = new Set(selected);

const allWerkworden: VerbInfo[] = werkworden as VerbInfo[];

const selectedWerkworden = allWerkworden.filter((verb: VerbInfo) => {
  return selectedDictionary.has(verb.infinitive);
});

export function useVerbProvider(list: VerbList | null): [VerbInfo | null, () => void] {
  const [verb, setVerb] = useState<VerbInfo | null>(null);
  const [index, setIndex] = useState<number>(-1);

  const next = useCallback(() => {
    if (!list) {
      return;
    }

    const N = list.items.length;
    const nextIndex = Math.round(Math.random() * (N));

    setIndex(nextIndex % N);
  }, [list]);

  useEffect(() => {
    if (!list) {
      return;
    }

    setVerb(list.items[index]);
  }, [index, list]);

  useEffect(() => {
    next();
  }, [next]);

  return [verb, next] as const;
}

const DEFAULT_LIST: VerbList[] = [
  {
    id: '1',
    label: 'All',
    items: allWerkworden,
  },
  {
    id: '2',
    label: 'My',
    items: selectedWerkworden,
  }
];

export function useWordLists() {
  const [list, setList] = useState(DEFAULT_LIST)

  const create = useCallback(() => {
    setList([...list]);
  }, [list, setList]);
  const update = useCallback(() => {
    setList([...list]);
  }, [list, setList]);
  const remove = useCallback(() => {
    setList([...list]);
  }, [list, setList]);


  return [list, create, update, remove] as const;
}
