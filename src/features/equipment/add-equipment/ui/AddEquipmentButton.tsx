import { openAddModalEv } from '@/features/equipment/add-equipment/model';
import { Button } from '@/shared/ui/button';
import { useUnit } from 'effector-react';
import type { FC } from 'react';

interface AddEquipmentButtonProps {
  placeId: string;
}

export const AddEquipmentButton: FC<AddEquipmentButtonProps> = ({ placeId }) => {
  const [openModal] = useUnit([openAddModalEv]);

  const handleOpenModal = (placeId: string) => () => openModal({ placeId });

  return <Button title={'Добавить'} variant={'success'} onClick={handleOpenModal(placeId)} />;
};
