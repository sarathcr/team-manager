export interface ModalConfig {
  variant: ModalInfoVariant
  title: string
  description: string
  confirmLabel: string
  cancelLabel?: string
}

export type ModalInfoVariant = 'delete' | 'unlock'
