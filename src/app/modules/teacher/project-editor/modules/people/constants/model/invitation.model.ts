export type InvitationModalView = 'INVITATION' | 'SUCCESS' | 'ERROR'

export type InvitationModalUserType = 'TEACHER' | 'STUDENT'

export interface InvitationModalConfig {
  view: InvitationModalView
  userType: InvitationModalUserType
}

export interface InvitationModalData {
  title: string
  confirmLabel: string
  label?: string
  placeholder?: string
  description?: string
}

export interface InvitationErrorTitle {
  inExperience: string
  invitationPending: string
  notTeacher: string
  notStudent: string
}

export type InvitationErrorTypes =
  | 'InvitationPending'
  | 'InExperience'
  | 'NotTeacher'
  | 'NotStudent'

export interface InvitationErrorResponse {
  errorType: InvitationErrorTypes
  mail: string[]
}
