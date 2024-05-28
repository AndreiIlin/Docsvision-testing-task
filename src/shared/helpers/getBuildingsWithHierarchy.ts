import type { Building, BuildingWithHierarchy } from '@/shared/types/building';

export const getBuildingsWithHierarchy = (buildings: Building[]): BuildingWithHierarchy[] => {
  const buildingMap = new Map<string, BuildingWithHierarchy>();

  buildings.forEach(building => {
    buildingMap.set(building.id, { ...building, parts: [] });
  });

  const result: BuildingWithHierarchy[] = [];

  // Заполняем parts для каждого здания
  buildingMap.forEach((building, id) => {
    building.parts = buildings
      .find(b => b.id === id)?.parts.map(partId => buildingMap.get(partId)!) || [];

    if (!buildings.some(b => b.parts.includes(building.id))) {
      result.push(building);
    }
  });

  return result;
};
