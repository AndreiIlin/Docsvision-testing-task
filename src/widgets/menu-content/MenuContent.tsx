import { Aside, MenuButton } from '@/entities/building/ui';
import { closeMenuEv } from '@/features/buildings/aside-menu/model';
import CloseIcon from '@/shared/icons/close-icon.svg?react';
import { $isMenuOpened } from '@/shared/store/buildings';
import { useUnit } from 'effector-react';
import type { FC, PropsWithChildren } from 'react';

export const MenuContent: FC<PropsWithChildren> = ({ children }) => {
  const [isOpened, closeMenu] = useUnit([$isMenuOpened, closeMenuEv]);

  return (
    <Aside isOpened={isOpened}>
      <MenuButton onClick={closeMenu} Icon={CloseIcon} />
      {children}
    </Aside>
  );
};
