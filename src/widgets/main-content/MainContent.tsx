import { MenuButton } from '@/entities/building/ui';
import { openMenuEv } from '@/features/buildings/aside-menu/model';
import { MainLayout } from '@/shared/ui/main-layout';
import MenuIcon from '@/shared/icons/menu-icon.svg?react'
import { useUnit } from 'effector-react';
import type { FC, PropsWithChildren } from 'react';

export const MainContent: FC<PropsWithChildren> = ({ children }) => {
  const [openMenu] = useUnit([openMenuEv]);

  return (
    <MainLayout>
      <MenuButton onClick={openMenu} Icon={MenuIcon} />
      {children}
    </MainLayout>
  );
};
