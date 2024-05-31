export type ModalType = 'add' | 'remove' | 'update' | null;

export interface ModalAddingPayload {
  placeId: string;
}

export interface ModalRemovingPayload {
  equipmentId: string;
}

export interface ModalUpdatePayload extends ModalAddingPayload {
  name: string;
  count: number;
  equipmentId: string;
}

export type ModalPayload = ModalAddingPayload | ModalUpdatePayload | ModalRemovingPayload | null;

export interface ModalData {
  type: ModalType;
  payload: ModalPayload;
}
