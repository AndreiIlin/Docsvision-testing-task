import { ModalData } from '@/shared/types/modal';
import { createEvent, createStore, sample } from 'effector';

export const $modalStore = createStore<ModalData>({ type: null, payload: null });
export const $isModalOpen = createStore(false);

export const closeModalEv = createEvent();

sample({
  clock: closeModalEv,
  fn: () => ({ type: null, payload: null }),
  target: $modalStore
});

sample({
  clock: closeModalEv,
  fn: () => false,
  target: $isModalOpen
});
