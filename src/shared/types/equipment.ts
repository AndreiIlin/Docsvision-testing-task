export interface Equipment {
  id: string;
  placeId: string | null;
  data: {
    name: string;
    count: number;
  };
}

export type EquipmentById = Record<string, Equipment[]>;
