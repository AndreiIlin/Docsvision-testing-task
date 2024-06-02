import { BuildingsList } from '@/entities/building/ui';
import { closeMenuEv } from '@/features/buildings/aside-menu/model';
import {
  $buildingsWithHierarchyStore,
  $isInitializationDataError,
  $isInitializationDataLoading,
  initDataEv,
} from '@/shared/store';
import { BuildingsSkeleton } from '@/shared/ui/loaders';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';

export const Buildings = () => {
  const initData = useUnit(initDataEv);
  const [buildings, isLoading, isError, closeMenu] = useUnit([
    $buildingsWithHierarchyStore,
    $isInitializationDataLoading,
    $isInitializationDataError,
    closeMenuEv,
  ]);

  useEffect(() => {
    initData();
  }, [initData]);

  if (isError || isLoading) {
    return <BuildingsSkeleton />;
  }

  return <BuildingsList closeMenu={closeMenu} buildings={buildings} />;
};
