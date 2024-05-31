import { firebaseApi } from '@/shared/api';
import { isCountValid } from '@/shared/helpers/isCountValid';
import { fetchEquipmentFx } from '@/shared/store/equipments';
import { $isModalOpen, $modalStore, closeModalEv } from '@/shared/store/modal';
import { ModalAddingPayload, ModalData } from '@/shared/types/modal';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { toast } from 'react-toastify';

const addEquipmentFx = createEffect(
  ({ placeId, name, count }: { placeId: string; name: string; count: number }) =>
    firebaseApi.addEquipment(placeId, name, count)
);

addEquipmentFx.done.watch(() => {
  toast('Оборудование было успешно добавлено', { type: 'success', position: 'top-right' });
  closeModalEv();
});

addEquipmentFx.fail.watch(() => {
  toast('Произошла ошибка при добавлении оборудования', { type: 'error', position: 'top-right' });
});

export const addFormTitleChangedEv = createEvent<string>();
export const addFormCountChangedEv = createEvent<string>();

export const openAddModalEv = createEvent<ModalAddingPayload>();
export const addFormSubmittedEv = createEvent();

export const $addFormTitle = createStore('')
  .reset(closeModalEv)
  .on(addFormTitleChangedEv, (_, title) => title);
export const $addFormCount = createStore('')
  .reset(closeModalEv)
  .on(addFormCountChangedEv, (_, count) => count);
const $addFormBuildingId = createStore<string | null>(null).reset(closeModalEv);

export const $addFormDisabled = createStore(false)
  .reset(addEquipmentFx.done)
  .reset(addEquipmentFx.fail);

export const $addFormTitleError = createStore('').reset(closeModalEv);
export const $addFormCountError = createStore('').reset(closeModalEv);

sample({
  clock: openAddModalEv,
  fn: ({ placeId }) => ({ type: 'add', payload: { placeId } }) as ModalData,
  target: $modalStore
});

sample({
  clock: openAddModalEv,
  fn: () => true,
  target: $isModalOpen
});

sample({
  clock: $modalStore.updates,
  fn: (store) => {
    if (store.type === 'add' && store.payload && 'placeId' in store.payload) {
      return store.payload.placeId;
    }
    return null;
  },
  target: $addFormBuildingId
});

sample({
  clock: addFormSubmittedEv,
  fn: () => true,
  target: $addFormDisabled
});

sample({
  clock: addFormSubmittedEv,
  source: $addFormTitle,
  fn: (title) => {
    if (!title.trim().length) {
      return 'Поле "Название" не может быть пустым';
    }

    return '';
  },
  target: $addFormTitleError
});

$addFormTitleError.watch((state) => console.log('$addFormTitleError:', state));

sample({
  clock: addFormSubmittedEv,
  source: $addFormCount,
  fn: (count) => {
    if (!count.trim().length) {
      return 'Поле "Количество" не может быть пустым';
    }
    if (!isCountValid(count.trim())) {
      return 'Количество может быть только числом и должно быть больше нуля';
    }
    return '';
  },
  target: $addFormCountError
});

sample({
  clock: [$addFormCountError, $addFormTitleError],
  filter: ([countError, titleError]) => !!countError || !!titleError,
  fn: () => false,
  target: $addFormDisabled
});

sample({
  clock: addFormSubmittedEv,
  source: {
    placeId: $addFormBuildingId,
    name: $addFormTitle,
    count: $addFormCount,
    titleError: $addFormTitleError,
    countError: $addFormCountError
  },
  filter: ({ placeId, titleError, countError }) => !!placeId && !titleError && !countError,
  fn: ({ placeId, name, count }) =>
    ({
      placeId,
      name,
      count: +count
    }) as { placeId: string; name: string; count: number },
  target: addEquipmentFx
});

sample({
  clock: addEquipmentFx.done,
  target: fetchEquipmentFx
});
