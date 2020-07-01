export interface InformationConfig {
  variant: string
  title: string
  description: string
  icon?: string
  redirectTo?: number
  completeLabel?: string
}

export interface ConfirmationConfig {
  variant: string
  title: string
  description: string
  deleteLabel?: string
  cancelLabel?: string
}
