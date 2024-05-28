import type { Building } from '@/shared/types/building';
import type { DocumentReference, QuerySnapshot } from 'firebase/firestore';

export const transformBuildingsInfo = (response: QuerySnapshot): Building[] => response.docs.map(doc => {
  const data = doc.data();
  return {
    id: doc.id,
    data: {
      name: data.name,
      parts: data.parts,
    },
    parts: data.parts ? data.parts.map((part: DocumentReference) => part.id) : [],
  };
});
