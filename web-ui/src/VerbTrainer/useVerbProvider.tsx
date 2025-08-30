import { useCallback, useEffect, useState } from "react";
import type { VerbInfo } from "./VerbTypes";

import selected from '../assets/selected.json';
import werkworden from '../assets/werkwoorden.json';


const selectedDictionary = new Set(selected);

const allWerkworden: VerbInfo[] = werkworden as VerbInfo[];

const selectedWerkworden = allWerkworden.filter((verb: VerbInfo) => {
  return selectedDictionary.has(verb.infinitive);
});

const N = selectedWerkworden.length;
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
    setVerb(selectedWerkworden[index]);
  }, [index]);

  return [verb, next] as const;
};
