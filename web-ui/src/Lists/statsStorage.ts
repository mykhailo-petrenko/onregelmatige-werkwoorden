import { useEffect, useCallback } from 'react';
import { useAtom, atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

const DB_NAME = 'onregelmatige_werkwoorden';
const DB_VERSION = 1;
const WORDS_STORE = 'words';
const STATS_STORE = 'stats';

export const MIN_BUCKET = 1;
export const MAX_BUCKET = 5;
export const DEFAULT_BUCKET = MIN_BUCKET;

export type LearnStat = {
  id: string; // word id
  correct: boolean;
  timestamp: number;
};

// save all available "id" => "probability" and "total"
export type WordBuckets = {[key: string]: number };

const wordBuckets = atomWithStorage<WordBuckets>(
  'wordBuckets',
  {},
  createJSONStorage(),
  { getOnInit: true }
);

const indexDBAtom = atom<IDBDatabase | null>(null);

export function useWordBuckets() {
  const [buckets, setBuckets] = useAtom(wordBuckets);

  const setWordBucket = useCallback(
    (id: string, value: number) => {
      setBuckets({
        ...buckets,
        [id]: value,
      });
    }, [buckets, setBuckets]
  );

  const getWordBucket = useCallback(
    (id: string, default_value: number = DEFAULT_BUCKET) => {
      return buckets[id] || default_value;
    },
    [buckets]
  );

  return {getWordBucket, setWordBucket};
}

export function useIndexedDb() {
  const [db, setDb] = useAtom<IDBDatabase | null>(indexDBAtom);

  // Open database
  useEffect(() => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(WORDS_STORE)) {
        db.createObjectStore(WORDS_STORE);
      }

      if (!db.objectStoreNames.contains(STATS_STORE)) {
        const store = db.createObjectStore(STATS_STORE, {
          keyPath: 'key',
          autoIncrement: true,
        });
        store.createIndex('id', 'id', {unique: false});
      }
    };

    request.onsuccess = () => {
      setDb(request.result);
    };

    request.onerror = () => {
      console.error('IndexedDB error:', request.error);
    };
  }, [setDb]);

  // Helpers
  const getTransaction = useCallback(
    (storeName: string, mode: IDBTransactionMode = 'readonly') => {
      if (!db) throw new Error('DB not initialized');
      return db.transaction(storeName, mode).objectStore(storeName);
    },
    [db]
  );

  // --- learnStats ---
  const addLearnStat = useCallback(
    (stat: LearnStat) =>
      new Promise<number>((resolve, reject) => {
        try {
          const store = getTransaction(STATS_STORE, 'readwrite');
          const req = store.add(stat);
          req.onsuccess = () => resolve(req.result as number);
          req.onerror = () => reject(req.error);
        } catch (e) {
          reject(e);
        }
      }),
    [getTransaction]
  );

  const getStatsByWordId = useCallback(
    (wordId: string) =>
      new Promise<LearnStat[]>((resolve, reject) => {
        try {
          const store = getTransaction(STATS_STORE);
          const index = store.index('id');
          const req = index.getAll(wordId);
          req.onsuccess = () => resolve(req.result as LearnStat[]);
          req.onerror = () => reject(req.error);
        } catch (e) {
          reject(e);
        }
      }),
    [getTransaction]
  );

  return {
    ready: !!db,
    addLearnStat,
    getStatsByWordId,
  };
}

export function useUpdateWordStats() {
  const {ready, addLearnStat} = useIndexedDb();
  const {getWordBucket, setWordBucket} = useWordBuckets();

  return useCallback(function updateWordStats(wordId: string, isValid: boolean) {
    (async () => {
      if (!ready) {
        console.error(`skip update, db is not ready. ${wordId}.`);
        return;
      }

      const timestamp = (new Date()).getTime();
      let bucket = getWordBucket(wordId);

      if (isValid) {
        bucket += 1;
      } else {
        bucket -= 1;
      }

      bucket = Math.min(Math.max(bucket, MIN_BUCKET), MAX_BUCKET);

      setWordBucket(wordId, bucket);

      await addLearnStat({
        id: wordId,
        correct: isValid,
        timestamp: timestamp
      })
    })();
  }, [ready, getWordBucket, setWordBucket, addLearnStat]);
}
