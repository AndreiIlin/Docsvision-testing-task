import { firebaseApi } from '@/shared/api';
import { transformEquipmentInfo } from '@/shared/helpers/transformEquipmentInfo';
import { Equipment } from '@/shared/types/equipment';
import { createEffect, createStore, sample } from 'effector';

export const fetchEquipmentFx = createEffect(() => firebaseApi.getEquipmentInfo());

export const $equipmentsStore = createStore<Equipment[]>([]);

sample({
  clock: fetchEquipmentFx.doneData,
  fn: transformEquipmentInfo,
  target: $equipmentsStore,
});

$equipmentsStore.watch(state => console.log(state, '@equipment'))
