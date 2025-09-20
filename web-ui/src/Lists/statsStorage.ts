import { useEffect, useCallback } from 'react';
import { useAtom, atom } from 'jotai';

const DB_NAME = 'onregelmatige_werkwoorden';
const DB_VERSION = 1;
const WORDS_STORE = 'words';
const STATS_STORE = 'stats';

const MIN_BUCKET = 1;
const MAX_BUCKET = 5;

export type WordBucket = number;

export type LearnStat = {
  id: string; // word id
  correct: boolean;
  timestamp: number;
};

const indexDBAtom = atom<IDBDatabase | null>(null);

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

  // --- WordBuckets ---
  const setWordBucket = useCallback(
    (id: string, value: WordBucket) =>
      new Promise<void>((resolve, reject) => {
        try {
          const store = getTransaction(WORDS_STORE, 'readwrite');
          const req = store.put(value, id);
          req.onsuccess = () => resolve();
          req.onerror = () => reject(req.error);
        } catch (e) {
          reject(e);
        }
      }),
    [getTransaction]
  );

  const getWordBucket = useCallback(
    (id: string) => {
      return new Promise<WordBucket>((resolve, reject) => {
        const default_bucket = 1;

        try {
          const store = getTransaction(WORDS_STORE);
          const req = store.get(id);
          req.onsuccess = () => resolve((req.result || default_bucket) as WordBucket);
          req.onerror = () => reject(req.error);
        } catch (e) {
          reject(e);
        }
      })
    },
    [getTransaction]
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
    setWordBucket,
    getWordBucket,
    addLearnStat,
    getStatsByWordId,
  };
}

export function useUpdateWordStats() {
  const {ready, getWordBucket, setWordBucket, addLearnStat} = useIndexedDb();

  return useCallback(function updateWordStats(wordId: string, isValid: boolean) {
    (async () => {
      if (!ready) {
        console.error(`skip update, db is not ready. ${wordId}.`);
        return;
      }

      const timestamp = (new Date()).getTime();
      let bucket = await getWordBucket(wordId);

      if (isValid) {
        bucket = Math.min(bucket+1, MAX_BUCKET);
      } else {
        bucket = Math.max(bucket-1, MIN_BUCKET);
      }

      await setWordBucket(wordId, bucket);
      await addLearnStat({
        id: wordId,
        correct: isValid,
        timestamp: timestamp
      })
    })();
  }, [ready, getWordBucket, setWordBucket, addLearnStat]);
}
