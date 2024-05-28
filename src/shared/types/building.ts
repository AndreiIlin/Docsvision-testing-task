import type { DocumentReference } from 'firebase/firestore';

export interface Building {
  id: string;
  parts: string[];
  data?: {
    name: string;
    parts: DocumentReference[]
  };
}

export interface BuildingWithHierarchy extends Omit<Building, 'parts'> {
  parts: BuildingWithHierarchy[]
}
