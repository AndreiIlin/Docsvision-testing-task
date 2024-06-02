import { $isMenuOpened } from '@/shared/store/buildings';
import { createEvent, sample } from 'effector';

export const openMenuEv = createEvent();
export const closeMenuEv = createEvent();

sample({
  clock: openMenuEv,
  fn: () => true,
  target: $isMenuOpened,
});


sample({
  clock: closeMenuEv,
  fn: () => false,
  target: $isMenuOpened,
});
