import { $isModalOpen, $modalStore, closeModalEv } from '@/shared/store/modal';
import { ModalLayout } from '@/shared/ui/modal-layout';
import { AddEquipmentModal } from '@/widgets/modals/add-equipment-modal';
import { RemoveEquipmentModal } from '@/widgets/modals/remove-equipment-modal';
import { UpdateEquipmentsModal } from '@/widgets/modals/update-equipments-modal';
import { useUnit } from 'effector-react';

const existingModals = {
  add: AddEquipmentModal,
  remove: RemoveEquipmentModal,
  update: UpdateEquipmentsModal
};

export const Modals = () => {
  const [modals, isOpen, handleClose] = useUnit([$modalStore, $isModalOpen, closeModalEv]);

  if (!isOpen || !modals.type) return null;

  const Component = existingModals[modals.type];

  return (
    <ModalLayout closeModal={handleClose}>
      <Component />
    </ModalLayout>
  );
};
