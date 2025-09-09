export interface VerbInfo {
  id: string;
  infinitive: string;
  imperfectum: [string, string];
  perfectum: string[];
  vertaling: string;
  hulpWerkwoorden: string[];
}

export interface VerbList {
  id?: string;
  label: string;
  items: VerbInfo[];
}

export type VerbListCollection = VerbList[];

export interface VerbListPersistence {
  id?: string;
  label: string;
  items: string[];
}

export type VerbListPersistenceCollection = VerbListPersistence[];
