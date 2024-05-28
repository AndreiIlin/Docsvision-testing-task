import { getBuildingsWithHierarchy } from '@/shared/helpers/getBuildingsWithHierarchy';
import { $buildingsStore, fetchBuildingsFx } from '@/shared/store/buildings';
import { $equipmentsStore, fetchEquipmentFx } from '@/shared/store/equipments';
import { BuildingWithHierarchy } from '@/shared/types/building';
import { createEvent, createStore, sample } from 'effector';

export const $buildingsWithHierarchyStore = createStore<BuildingWithHierarchy[]>([]);
export const initDataEv = createEvent();

sample({
  clock: initDataEv,
  target: fetchBuildingsFx,
});

sample({
  clock: fetchBuildingsFx.done,
  target: fetchEquipmentFx,
});

sample({
  clock: $equipmentsStore.updates,
  source: $buildingsStore,
  fn: storeData => getBuildingsWithHierarchy(storeData),
  target: $buildingsWithHierarchyStore,
});

$buildingsWithHierarchyStore.watch(state => console.log(state, '@hier state'));
