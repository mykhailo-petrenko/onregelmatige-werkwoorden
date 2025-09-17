import { useEffect, useState, useCallback } from 'react';

const DB_NAME = 'onregelmatige_werkwoorden';
const DB_VERSION = 1;
const WORDS_STORE = 'words';
const STATS_STORE = 'stats';

export type WordBucket = {
  bucketId: number; // 1..5
};

export type LearnStat = {
  id: string; // word id
  correct: boolean;
  timestamp: number;
};

export function useIndexedDb() {
  const [db, setDb] = useState<IDBDatabase | null>(null);

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
  }, []);

  // Helpers
  const getTx = useCallback(
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
          const store = getTx(WORDS_STORE, 'readwrite');
          const req = store.put(value, id);
          req.onsuccess = () => resolve();
          req.onerror = () => reject(req.error);
        } catch (e) {
          reject(e);
        }
      }),
    [getTx]
  );

  const getWordBucket = useCallback(
    (id: string) =>
      new Promise<WordBucket | undefined>((resolve, reject) => {
        try {
          const store = getTx(WORDS_STORE);
          const req = store.get(id);
          req.onsuccess = () => resolve(req.result as WordBucket | undefined);
          req.onerror = () => reject(req.error);
        } catch (e) {
          reject(e);
        }
      }),
    [getTx]
  );

  // --- learnStats ---
  const addLearnStat = useCallback(
    (stat: LearnStat) =>
      new Promise<number>((resolve, reject) => {
        try {
          const store = getTx(STATS_STORE, 'readwrite');
          const req = store.add(stat);
          req.onsuccess = () => resolve(req.result as number);
          req.onerror = () => reject(req.error);
        } catch (e) {
          reject(e);
        }
      }),
    [getTx]
  );

  const getStatsByWordId = useCallback(
    (wordId: string) =>
      new Promise<LearnStat[]>((resolve, reject) => {
        try {
          const store = getTx(STATS_STORE);
          const index = store.index('id');
          const req = index.getAll(wordId);
          req.onsuccess = () => resolve(req.result as LearnStat[]);
          req.onerror = () => reject(req.error);
        } catch (e) {
          reject(e);
        }
      }),
    [getTx]
  );

  return {
    ready: !!db,
    setWordBucket,
    getWordBucket,
    addLearnStat,
    getStatsByWordId,
  };
}
