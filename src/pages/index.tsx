import { BuildingPage } from '@/pages/building-page';
import { ErrorPage } from '@/pages/error-page';
import { MainPage } from '@/pages/main-page';
import { routes } from '@/shared/routes';
import { MainText } from '@/shared/ui/main-text';
import { Modals } from '@/widgets/modals/Modals';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export const Router = () => (
  <>
    <Routes>
      <Route path={routes.main} element={<MainPage />}>
        <Route index element={<MainText />} />
        <Route path={routes.notFound} element={<ErrorPage />} />
        <Route path={routes.serverError} element={<ErrorPage />} />
        <Route path={routes.building} element={<BuildingPage />} />
        <Route path={routes.rest} element={<Navigate to={routes.notFound} />} />
      </Route>
    </Routes>
    <Modals />
    <ToastContainer />
  </>
);
