import { ErrorText } from '@/shared/ui/error-text';
import type { FC } from 'react';
import { useLocation } from 'react-router-dom';

export const ErrorPage: FC = () => {
  const location = useLocation();

  return <ErrorText pathname={location.pathname} />;
};
