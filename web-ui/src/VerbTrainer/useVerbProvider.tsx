import { useCallback, useEffect, useState } from "react";
import type { VerbInfo } from "./VerbTypes";

import selected from '../assets/selected.json';
import werkworden from '../assets/werkwoorden.json';

const parseWerkworden = (input: string[][]): VerbInfo[] => {
  return input.map(((row: string[]) => {
    return {
      infinitive: row[0],
      imperfectum: row[2].split('|'),
      participium: row[3].split('|'),
      meaning: row[4].split('|').join(', ')
    } as VerbInfo;
  }));
};

const selectedDictionary = new Set(selected);

const allWerkworden: VerbInfo[] = parseWerkworden(werkworden).filter((verb: VerbInfo) => {
  return selectedDictionary.has(verb.infinitive);
});

const N = allWerkworden.length;
const start = Math.round(Math.random() * (N+1)) % N;

export function useVerbProvider(): [VerbInfo | null, () => void] {
  const [verb, setVerb] = useState<VerbInfo | null>(null);
  const [index, setIndex] = useState<number>(start);

  const next = useCallback(() => {
    const next = Math.round(Math.random() * (N+1));
    // const next = (index + 1);
    setIndex(next % N);
  }, [index]);

  useEffect(() => {
    setVerb(allWerkworden[index]);
  }, [index]);

  return [verb, next] as const;
};
