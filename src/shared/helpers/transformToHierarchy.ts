import type { Building, BuildingWithHierarchy } from '@/shared/types/building';
import type { Equipment } from '@/shared/types/equipment';

const updateIsEmptyFlag = (building: BuildingWithHierarchy): boolean => {
  if (building.parts.length === 0) {
    return building.isEmpty;
  }

  building.isEmpty = building.parts.every((part) => updateIsEmptyFlag(part));
  return building.isEmpty;
};

export const transformToHierarchy = (
  buildings: Building[],
  equipments: Equipment[]
): BuildingWithHierarchy[] => {
  const buildingMap = new Map<string, BuildingWithHierarchy>();

  buildings.forEach((building) => {
    buildingMap.set(building.id, { ...building, parts: [], isEmpty: true });
  });

  buildingMap.forEach((building, id) => {
    building.parts =
      buildings.find((b) => b.id === id)?.parts.map((partId) => buildingMap.get(partId)!) || [];

    if (building.parts.length === 0) {
      const equipment = equipments.find((eq) => eq.placeId === id);
      building.isEmpty = !equipment;
    }
  });

  buildingMap.forEach((building) => {
    updateIsEmptyFlag(building);
  });

  const result: BuildingWithHierarchy[] = [];

  buildingMap.forEach((building, id) => {
    if (!buildings.some((b) => b.parts.includes(id))) {
      result.push(building);
    }
  });

  return result;
};
