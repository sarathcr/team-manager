import { AcademicYear, Subject } from './curriculum-data.model'

/* Card backend model starts here */
export interface Card {
  id: number
  academicYear: AcademicYear
  advance: number
  assigned: AssignedUsers
  cardTitle: string
  cardtype: CardType
  createdAt: string
  creativeImage: string
  creativeTitle: string
  isNew: boolean
  isNotificationPresent: boolean
  isPremium: boolean
  isTemplate: boolean
  state: ExperienceState
  subjectOptions: CardSubjectsInfo
  type: ExperienceType
  updatedAt: string
  userIdLoggedIn: number
}

export interface AssignedUsers {
  invitator: CardUser
  mainUser: CardUser
  otherUsers: CardUser[]
  usersCount: number
}

export interface CardUser {
  email: string
  id: number
  userImage: string
  userName: string
  lastName: string
  surName: string
}

export interface CardSubject {
  icon: string
  id: number
  name: string
}

export interface CardSubjectsInfo {
  subjectCount: number
  subjects: CardSubject[]
}

export interface CardList {
  projectCount: number
  projects: Card[]
  pageId: string
  pageSize: number
}

export type ExperienceType = 'EMPTY' | 'DIDACTIC_UNIT' | 'PROJECT' | 'ACTIVITY'

export type CardType =
  | 'TEACHER_INVITATION'
  | 'TEACHER_EXPERIENCE'
  | 'TEACHER_TEMPLATE'
  | 'STUDENT_INVITATION'
  | 'STUDENT_EXPERIENCE'

export type ExperienceState = 'DRAFT' | 'PENDING' | 'INPROCESS' | 'DONE'

/* Cards backend model ends here */

export type CardExperienceVariant = 'teacher' | 'student' | 'template'
