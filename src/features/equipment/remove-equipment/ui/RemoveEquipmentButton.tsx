import { openRemoveModalEv } from '@/features/equipment/remove-equipment/model';
import { Button } from '@/shared/ui/button';
import { useUnit } from 'effector-react';
import { FC } from 'react';

interface RemoveEquipmentButtonProps {
  equipmentId: string;
}

export const RemoveEquipmentButton: FC<RemoveEquipmentButtonProps> = ({ equipmentId }) => {
  const [openModal] = useUnit([openRemoveModalEv]);

  const handleOpenModal = (equipmentId: string) => () => openModal({ equipmentId });

  return <Button title={'Удалить'} variant={'danger'} onClick={handleOpenModal(equipmentId)} />;
};
