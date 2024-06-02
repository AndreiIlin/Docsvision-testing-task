import { MainContainer } from '@/shared/ui/main-container';
import { Wrapper } from '@/shared/ui/wrapper';
import { Buildings } from '@/widgets/buildings';
import { MainContent } from '@/widgets/main-content';
import { MenuContent } from '@/widgets/menu-content';
import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const MainPage: FC = () => {
  return (
    <Wrapper>
      <MainContainer>
        <MenuContent>
          <Buildings />
        </MenuContent>
        <MainContent>
          <Outlet />
        </MainContent>
      </MainContainer>
    </Wrapper>
  );
};
