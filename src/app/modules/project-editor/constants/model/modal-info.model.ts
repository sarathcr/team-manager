export interface ModalConfig {
  variant: ModalVariant
  title: string
  description: string
  confirmLabel: string
  cancelLabel?: string
}

export type ModalVariant = 'delete' | 'unlock'
