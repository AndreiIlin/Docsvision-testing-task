import { initDataEv } from '@/shared/store/store';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';

export const App = () => {
  const initData = useUnit(initDataEv);
  useEffect(() => {
    initData();
  }, []);
  return (
    <div>
    </div>
  );
};
