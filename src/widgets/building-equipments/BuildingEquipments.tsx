import { EquipmentsList } from '@/entities/equipment/ui/equipments-list';
import { AddEquipmentButton } from '@/features/equipment/add-equipment/ui';
import { RemoveEquipmentButton } from '@/features/equipment/remove-equipment/ui';
import { UpdateEquipmentButton } from '@/features/equipment/update-equipment/ui';
import { $buildingsStore } from '@/shared/store/buildings';
import { useUnit } from 'effector-react';
import type { FC } from 'react';
import { useParams } from 'react-router-dom';

interface BuildingEquipmentsProps {
  buildId: string;
}

export const BuildingEquipments: FC<BuildingEquipmentsProps> = ({ buildId }) => {
  const [buildings] = useUnit([$buildingsStore]);
  const params = useParams();

  const building = buildings.find((build) => build.id === buildId);

  if (!building) return null;

  const isEditable = params.id === buildId && !building.parts.length;

  return (
    <>
      <EquipmentsList
        buildingTitle={building.data?.name ?? ''}
        buildingId={building.id}
        isEditable={isEditable}
        AddAction={AddEquipmentButton}
        RemoveAction={RemoveEquipmentButton}
        UpdateAction={UpdateEquipmentButton}
      />
      {!!building.parts.length &&
        building.parts.map((part) => <BuildingEquipments key={part} buildId={part} />)}
    </>
  );
};
