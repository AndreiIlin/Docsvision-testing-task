import { routes } from '@/shared/routes';
import { $isInitializationDataLoading } from '@/shared/store';
import { $buildingsStore } from '@/shared/store/buildings';
import { EquipmentLayout } from '@/shared/ui/equipment-layout';
import { EquipmentsSkeleton } from '@/shared/ui/loaders';
import { BuildingEquipments } from '@/widgets/building-equipments';
import { useUnit } from 'effector-react';
import type { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const BuildingPage: FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [buildings, isLoading] = useUnit([$buildingsStore, $isInitializationDataLoading]);

  if (isLoading) {
    return <EquipmentsSkeleton />;
  }

  const currentBuilding = buildings.find((building) => building.id === params.id);
  if (!currentBuilding) navigate(routes.notFound);

  return (
    <EquipmentLayout>
      <BuildingEquipments buildId={params.id!} />
    </EquipmentLayout>
  );
};
