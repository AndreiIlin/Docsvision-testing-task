import { firebaseApi } from '@/shared/api';
import { transformBuildingsInfo } from '@/shared/helpers/transformBuildingsInfo';
import { Building } from '@/shared/types/building';
import { createEffect, createStore, sample } from 'effector';

export const fetchBuildingsFx = createEffect(() => firebaseApi.getBuildingsInfo());
export const $buildingsStore = createStore<Building[]>([]);
export const $roomsStore = createStore<Building[]>([]);

sample({
  clock: fetchBuildingsFx.doneData,
  fn: transformBuildingsInfo,
  target: $buildingsStore
});

sample({
  clock: $buildingsStore.updates,
  fn: (buildings) => buildings.filter((building) => !building.parts.length),
  target: $roomsStore
});
