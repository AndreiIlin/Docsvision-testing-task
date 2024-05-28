import type { DocumentReference } from 'firebase/firestore';

export interface Equipment {
  id: string;
  placeId: string | null;
  data: {
    name: string;
    count: number;
    place: DocumentReference
  }
}
