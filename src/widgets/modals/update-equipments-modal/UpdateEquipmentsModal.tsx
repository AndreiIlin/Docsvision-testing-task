import {
  $updateFormCount,
  $updateFormCountError,
  $updateFormDisabled,
  $updateFormPlaceId,
  $updateFormTitle,
  $updateFormTitleError,
  updateFormCountChangedEv,
  updateFormPlaceIdChangedEv,
  updateFormSubmittedEv,
  updateFormTitleChangedEv
} from '@/features/equipment/update-equipment/model';
import { $roomsStore } from '@/shared/store/buildings';
import { closeModalEv } from '@/shared/store/modal';
import { SelectOption } from '@/shared/types/select';
import { Button } from '@/shared/ui/button';
import { Form } from '@/shared/ui/form';
import { FormField } from '@/shared/ui/form-field';
import { FormSelect } from '@/shared/ui/form-select';
import { useUnit } from 'effector-react';
import type { FC } from 'react';
import { ChangeEvent, FormEvent, useMemo } from 'react';

export const UpdateEquipmentsModal: FC = () => {
  const [title, changeTitle, titleError] = useUnit([
    $updateFormTitle,
    updateFormTitleChangedEv,
    $updateFormTitleError
  ]);
  const [count, changeCount, countError] = useUnit([
    $updateFormCount,
    updateFormCountChangedEv,
    $updateFormCountError
  ]);
  const [disabled, submitForm, closeModal] = useUnit([
    $updateFormDisabled,
    updateFormSubmittedEv,
    closeModalEv
  ]);
  const [changePlaceId, placeId, rooms] = useUnit([
    updateFormPlaceIdChangedEv,
    $updateFormPlaceId,
    $roomsStore
  ]);

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

  const selectOptions: SelectOption[] = useMemo(
    () =>
      rooms.map((room) => ({
        value: room.id,
        label: room.data?.name ?? ''
      })),
    [rooms]
  );

  return (
    <Form
      onSubmit={handleSubmit}
      title={'Редактировать оборудование'}
      confirmNode={
        <Button
          type={'submit'}
          variant={'success'}
          size={'large'}
          title={'Обновить'}
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
      <FormSelect
        title={'Комната'}
        value={placeId!}
        options={selectOptions}
        onChange={changePlaceId}
      />
    </Form>
  );
};
