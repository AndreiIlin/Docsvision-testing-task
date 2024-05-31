import type { Equipment } from '@/shared/types/equipment';
import type { QuerySnapshot } from 'firebase/firestore';

export const transformEquipmentInfo = (response: QuerySnapshot): Equipment[] =>
  response.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      data: {
        name: data.name,
        count: data.count
      },
      placeId: data.place?.id || null
    };
  });
