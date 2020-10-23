export type ProfileType = 'TEACHER' | 'STUDENT' | 'EMPTY'

export type InvitationStatus = 'ACCEPTED' | 'DENIED' | 'INVITED'

export class CollaboratorList {
  users: Collaborator[]
  userCount?: number
}

export type CollaboratorFilterType = 'ALL' | 'TEACHER' | 'STUDENT'

export class CollaboratorFilter {
  id: number
  name: string
  type: CollaboratorFilterType
}

export class CollaboratorFilterByProfileType {
  teacher: CollaboratorsFilterByStatus
  student: CollaboratorsFilterByStatus
}

export class CollaboratorsFilterByStatus {
  invited: CollaboratorList
  accepted: CollaboratorList
  denied: CollaboratorList
}

export class Collaborator {
  email: string
  id?: number
  imageUrl?: string
  lastName?: string
  name?: string
  profile: string
  role?: string
  surName?: string
  invitationStatus?: InvitationStatus
  checked?: boolean
  inviteLabel?: string
}

export class AddCollaborator {
  projectId: number
  invitatorId: number
  emails: string[]
  profileType: ProfileType
}
