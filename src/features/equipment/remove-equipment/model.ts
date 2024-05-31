import { firebaseApi } from '@/shared/api';
import { fetchEquipmentFx } from '@/shared/store/equipments';
import { $isModalOpen, $modalStore, closeModalEv } from '@/shared/store/modal';
import { ModalData, ModalRemovingPayload } from '@/shared/types/modal';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { toast } from 'react-toastify';

export const removeEquipmentFx = createEffect((equipmentId: string) =>
  firebaseApi.deleteEquipment(equipmentId)
);

removeEquipmentFx.done.watch(() => {
  toast('Оборудование было успешно удалено', { type: 'success', position: 'top-right' });
  closeModalEv();
});

removeEquipmentFx.fail.watch(() => {
  toast('Произошла ошибка при удалении оборудования', { type: 'error', position: 'top-right' });
});

export const openRemoveModalEv = createEvent<ModalRemovingPayload>();
export const removeFormSubmittedEv = createEvent();

const $removeFormEquipmentId = createStore<string | null>(null).reset(closeModalEv);

export const $removeFormDisabled = createStore(false)
  .reset(removeEquipmentFx.done)
  .reset(removeEquipmentFx.fail);

sample({
  clock: openRemoveModalEv,
  fn: ({ equipmentId }) => ({ type: 'remove', payload: { equipmentId } }) as ModalData,
  target: $modalStore
});

sample({
  clock: openRemoveModalEv,
  fn: () => true,
  target: $isModalOpen
});

sample({
  clock: $modalStore.updates,
  fn: (store) => {
    if (store.type === 'remove' && store.payload && 'equipmentId' in store.payload) {
      return store.payload.equipmentId;
    }
    return null;
  },
  target: $removeFormEquipmentId
});

sample({
  clock: removeFormSubmittedEv,
  fn: () => true,
  target: $removeFormDisabled
});

sample({
  clock: removeFormSubmittedEv,
  source: $removeFormEquipmentId,
  filter: (equipmentID) => !!equipmentID,
  fn: (equipmentID) => equipmentID as string,
  target: removeEquipmentFx
});

sample({
  clock: removeEquipmentFx.done,
  target: fetchEquipmentFx
});
