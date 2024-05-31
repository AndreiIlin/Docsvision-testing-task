import { Aside } from '@/shared/ui/aside';
import { MainContainer } from '@/shared/ui/main-container';
import { MainLayout } from '@/shared/ui/main-layout';
import { Wrapper } from '@/shared/ui/wrapper';
import { Buildings } from '@/widgets/buildings';
import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const MainPage: FC = () => {
  return (
    <Wrapper>
      <MainContainer>
        <Aside>
          <Buildings />
        </Aside>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </MainContainer>
    </Wrapper>
  );
};
