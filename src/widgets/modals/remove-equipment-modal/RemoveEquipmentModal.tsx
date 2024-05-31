import {
  $removeFormDisabled,
  removeFormSubmittedEv
} from '@/features/equipment/remove-equipment/model';
import { closeModalEv } from '@/shared/store/modal';
import { Button } from '@/shared/ui/button';
import { Form } from '@/shared/ui/form';
import { useUnit } from 'effector-react';
import type { FC } from 'react';
import { FormEvent } from 'react';

export const RemoveEquipmentModal: FC = () => {
  const [disabled, submitForm] = useUnit([$removeFormDisabled, removeFormSubmittedEv]);

  const [closeModal] = useUnit([closeModalEv]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <Form
      onSubmit={handleSubmit}
      title={'Удалить оборудование'}
      confirmNode={
        <Button
          type={'submit'}
          variant={'success'}
          title={'Удалить'}
          size={'large'}
          disabled={disabled}
        />
      }
      cancelNode={
        <Button
          type={'button'}
          variant={'danger'}
          size={'large'}
          title={'Отменить'}
          disabled={disabled}
          onClick={closeModal}
        />
      }
    ></Form>
  );
};
