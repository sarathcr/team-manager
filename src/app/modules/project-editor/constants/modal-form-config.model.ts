export interface ModalFormConfig {
  variant: ModalFormVariant
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
}

export type ModalFormVariant = 'input'
