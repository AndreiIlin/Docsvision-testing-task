import {
  $addFormCount,
  $addFormCountError,
  $addFormDisabled,
  $addFormTitle,
  $addFormTitleError,
  addFormCountChangedEv,
  addFormSubmittedEv,
  addFormTitleChangedEv
} from '@/features/equipment/add-equipment/model';
import { closeModalEv } from '@/shared/store/modal';
import { Button } from '@/shared/ui/button';
import { Form } from '@/shared/ui/form';
import { FormField } from '@/shared/ui/form-field';
import { useUnit } from 'effector-react';
import type { ChangeEvent, FC, FormEvent } from 'react';

export const AddEquipmentModal: FC = () => {
  const [title, changeTitle, count, changeCount, titleError, countError, disabled, submitForm] =
    useUnit([
      $addFormTitle,
      addFormTitleChangedEv,
      $addFormCount,
      addFormCountChangedEv,
      $addFormTitleError,
      $addFormCountError,
      $addFormDisabled,
      addFormSubmittedEv
    ]);

  const [closeModal] = useUnit([closeModalEv]);

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    changeTitle(e.target.value);
  };

  const handleChangeCount = (e: ChangeEvent<HTMLInputElement>) => {
    changeCount(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <Form
      onSubmit={handleSubmit}
      title={'Добавить оборудование'}
      confirmNode={
        <Button
          type={'submit'}
          size={'large'}
          variant={'success'}
          title={'Добавить'}
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
    >
      <FormField label={'Название'} value={title} onChange={handleChangeTitle} error={titleError} />
      <FormField
        label={'Количество'}
        value={count}
        onChange={handleChangeCount}
        error={countError}
      />
    </Form>
  );
};
