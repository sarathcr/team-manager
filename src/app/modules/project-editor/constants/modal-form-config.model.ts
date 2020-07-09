export interface ModalFormConfig {
  variant: ModalFormVariant
  title: string
  confirmLabel: string
  inputValue?: string
}

export type ModalFormVariant = 'input'

export type ModalFormHideType = 'submit' | 'cancel'
