import { openUpdateModalEv } from '@/features/equipment/update-equipment/model';
import { Button } from '@/shared/ui/button';
import { useUnit } from 'effector-react';
import type { FC } from 'react';

interface UpdateEquipmentButtonProps {
  placeId: string;
  equipmentId: string;
  name: string;
  count: number;
}

export const UpdateEquipmentButton: FC<UpdateEquipmentButtonProps> = ({
  equipmentId,
  count,
  placeId,
  name
}) => {
  const [openModal] = useUnit([openUpdateModalEv]);

  const handleOpenModal = (placeId: string) => () =>
    openModal({ placeId, equipmentId, count, name });

  return <Button title={'Редактировать'} variant={'primary'} onClick={handleOpenModal(placeId)} />;
};
