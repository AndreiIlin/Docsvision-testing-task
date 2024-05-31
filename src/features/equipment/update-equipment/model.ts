import { firebaseApi } from '@/shared/api';
import { isCountValid } from '@/shared/helpers/isCountValid';
import { fetchEquipmentFx } from '@/shared/store/equipments';
import { $isModalOpen, $modalStore, closeModalEv } from '@/shared/store/modal';
import { ModalData, ModalUpdatePayload } from '@/shared/types/modal';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { toast } from 'react-toastify';

const updateEquipmentFx = createEffect(
  ({
    placeId,
    name,
    count,
    equipmentId
  }: {
    placeId: string;
    name: string;
    count: number;
    equipmentId: string;
  }) => firebaseApi.updateEquipment(equipmentId, name, count, placeId)
);

updateEquipmentFx.done.watch(() => {
  toast('Оборудование было успешно обновлено', { type: 'success', position: 'top-right' });
  closeModalEv();
});

updateEquipmentFx.fail.watch(() => {
  toast('Произошла ошибка при обновлении оборудования', { type: 'error', position: 'top-right' });
});

export const updateFormTitleChangedEv = createEvent<string>();
export const updateFormCountChangedEv = createEvent<string>();
export const updateFormPlaceIdChangedEv = createEvent<string>();

export const openUpdateModalEv = createEvent<ModalUpdatePayload>();
export const updateFormSubmittedEv = createEvent();

export const $updateFormTitle = createStore('')
  .reset(closeModalEv)
  .on(updateFormTitleChangedEv, (_, title) => title);
export const $updateFormCount = createStore('')
  .reset(closeModalEv)
  .on(updateFormCountChangedEv, (_, count) => count);
export const $updateFormPlaceId = createStore<string | null>(null)
  .reset(closeModalEv)
  .on(updateFormPlaceIdChangedEv, (_, place) => place);
const $updateFormEquipmentId = createStore<string | null>(null).reset(closeModalEv);

export const $updateFormDisabled = createStore(false)
  .reset(updateEquipmentFx.done)
  .reset(updateEquipmentFx.fail);

export const $updateFormTitleError = createStore('').reset(closeModalEv);
export const $updateFormCountError = createStore('').reset(closeModalEv);

sample({
  clock: openUpdateModalEv,
  fn: ({ placeId, name, count, equipmentId }) =>
    ({
      type: 'update',
      payload: { placeId, name, count, equipmentId }
    }) as ModalData,
  target: $modalStore
});

sample({
  clock: openUpdateModalEv,
  fn: () => true,
  target: $isModalOpen
});

sample({
  clock: $modalStore.updates,
  fn: (store) => {
    if (store.type === 'update' && store.payload && 'placeId' in store.payload) {
      return store.payload.placeId;
    }
    return null;
  },
  target: $updateFormPlaceId
});

sample({
  clock: $modalStore.updates,
  fn: (store) => {
    if (store.type === 'update' && store.payload && 'equipmentId' in store.payload) {
      return store.payload.equipmentId;
    }
    return null;
  },
  target: $updateFormEquipmentId
});

sample({
  clock: $modalStore.updates,
  fn: (store) => {
    if (store.type === 'update' && store.payload && 'name' in store.payload) {
      return store.payload.name;
    }
    return '';
  },
  target: $updateFormTitle
});

sample({
  clock: $modalStore.updates,
  fn: (store) => {
    if (store.type === 'update' && store.payload && 'count' in store.payload) {
      return store.payload.count.toString();
    }
    return '';
  },
  target: $updateFormCount
});

sample({
  clock: updateFormSubmittedEv,
  fn: () => true,
  target: $updateFormDisabled
});

sample({
  clock: updateFormSubmittedEv,
  source: $updateFormTitle,
  fn: (title) => {
    if (!title.trim().length) {
      return 'Поле "Название" не может быть пустым';
    }

    return '';
  },
  target: $updateFormTitleError
});

sample({
  clock: updateFormSubmittedEv,
  source: $updateFormCount,
  fn: (count) => {
    if (!count.trim().length) {
      return 'Поле "Количество" не может быть пустым';
    }
    if (!isCountValid(count.trim())) {
      return 'Количество может быть только числом и должно быть больше нуля';
    }
    return '';
  },
  target: $updateFormCountError
});

sample({
  clock: [$updateFormCountError, $updateFormTitleError],
  filter: ([countError, titleError]) => !!countError || !!titleError,
  fn: () => false,
  target: $updateFormDisabled
});

sample({
  clock: updateFormSubmittedEv,
  source: {
    placeId: $updateFormPlaceId,
    equipmentId: $updateFormEquipmentId,
    name: $updateFormTitle,
    count: $updateFormCount,
    titleError: $updateFormTitleError,
    countError: $updateFormCountError
  },
  filter: ({ placeId, titleError, countError, equipmentId }) =>
    !!equipmentId && !!placeId && !titleError && !countError,
  fn: ({ placeId, name, count, equipmentId }) =>
    ({
      placeId,
      name,
      count: +count,
      equipmentId
    }) as { placeId: string; name: string; count: number; equipmentId: string },
  target: updateEquipmentFx
});

sample({
  clock: updateEquipmentFx.done,
  target: fetchEquipmentFx
});

updateEquipmentFx.watch((payload) => console.log(payload, '@Update payload'));
