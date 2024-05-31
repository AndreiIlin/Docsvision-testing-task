import { Equipment, EquipmentById } from '@/shared/types/equipment';

export const transformEquipmentById = (equipments: Equipment[]): EquipmentById => {
  const temp: EquipmentById = {};

  for (const equipment of equipments) {
    if (!equipment.placeId) continue;

    if (!temp[equipment.placeId]) temp[equipment.placeId] = [];
    temp[equipment.placeId].push(equipment);
  }

  return temp;
};
