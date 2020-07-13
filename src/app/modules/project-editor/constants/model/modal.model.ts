export interface OpenModalConfig {
  type: ModalVariant
  subjectId?: number
  id?: number
}

export type ModalVariant = 'delete' | 'unlock'
