import { BuildingsList } from '@/entities/building/ui';
import {
  $buildingsWithHierarchyStore,
  $isInitializationDataError,
  $isInitializationDataLoading,
  initDataEv
} from '@/shared/store';
import { BuildingsSkeleton } from '@/shared/ui/loaders';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';

export const Buildings = () => {
  const initData = useUnit(initDataEv);
  const [buildings, isLoading, isError] = useUnit([
    $buildingsWithHierarchyStore,
    $isInitializationDataLoading,
    $isInitializationDataError
  ]);

  useEffect(() => {
    initData();
  }, [initData]);

  if (isError || isLoading) {
    return <BuildingsSkeleton />;
  }

  return <BuildingsList buildings={buildings} />;
};
