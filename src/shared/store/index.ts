import { transformToHierarchy } from '@/shared/helpers/transformToHierarchy';
import { $buildingsStore, fetchBuildingsFx } from '@/shared/store/buildings';
import { $equipmentsStore, fetchEquipmentFx } from '@/shared/store/equipments';
import type { BuildingWithHierarchy } from '@/shared/types/building';
import { createEvent, createStore, sample } from 'effector';
import { redirect } from 'react-router-dom';

export const $buildingsWithHierarchyStore = createStore<BuildingWithHierarchy[]>([]);
export const $isInitializationDataError = createStore(false);
$isInitializationDataError.updates.watch(() => {
  redirect('/500');
});

export const $isInitializationDataLoading = createStore(true);
export const initDataEv = createEvent();

sample({
  clock: initDataEv,
  target: fetchBuildingsFx
});

sample({
  clock: fetchBuildingsFx.done,
  target: fetchEquipmentFx
});

sample({
  clock: [fetchBuildingsFx.fail, fetchEquipmentFx.fail],
  fn: () => true,
  target: $isInitializationDataError
});

sample({
  clock: [fetchBuildingsFx.fail, fetchEquipmentFx.fail, fetchEquipmentFx.doneData],
  fn: () => false,
  target: $isInitializationDataLoading
});

sample({
  clock: $equipmentsStore.updates,
  source: { buildingsData: $buildingsStore, equipmentsData: $equipmentsStore },
  fn: ({ buildingsData, equipmentsData }) => transformToHierarchy(buildingsData, equipmentsData),
  target: $buildingsWithHierarchyStore
});
