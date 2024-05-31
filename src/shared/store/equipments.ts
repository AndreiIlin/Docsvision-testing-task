import { firebaseApi } from '@/shared/api';
import { transformEquipmentById } from '@/shared/helpers/transformEquipmentById';
import { transformEquipmentInfo } from '@/shared/helpers/transformEquipmentInfo';
import { Equipment, EquipmentById } from '@/shared/types/equipment';
import { createEffect, createStore, sample } from 'effector';

export const fetchEquipmentFx = createEffect(() => firebaseApi.getEquipmentInfo());

export const $equipmentsStore = createStore<Equipment[]>([]);
export const $equipmentsByIdStore = createStore<EquipmentById>({});

sample({
  clock: fetchEquipmentFx.doneData,
  fn: transformEquipmentInfo,
  target: $equipmentsStore
});

sample({
  clock: $equipmentsStore.updates,
  fn: transformEquipmentById,
  target: $equipmentsByIdStore
});
