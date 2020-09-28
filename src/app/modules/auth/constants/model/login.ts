export class LoginInfo {
  id: number
  email: string
  token?: string
  refreshToken?: string
  activa: boolean
}

export class LoginPayload {
  email: string
  password: string
  rememberMe: boolean
}

export class RegisterPayload {
  email: string
  password: string
  newsletterSubscription: boolean
}

export class GoogleAuthPayload {
  tocken: string
  newsletterSubscription?: boolean
}

export class EduCenter {
  id: number
  address: string
  name: string
  zipcode: number
}

export class Country {
  id: number
  name: string
}

export class Region {
  id: number
  name: string
}

export class Role {
  id?: number
  role: string
  description?: string
}

export class Workplace {
  descriptionName?: string
  descriptionSection?: string
  name?: string
  title?: string
}

export class UserData {
  name: string
  surName: string
  country: Country
  phonenumber: string
  region: Region
  role: string
}

export class User extends UserData {
  id: number
  active: boolean
  center: EduCenter
  email: string
  imageUrl: string
  lastName: string
  mailSended: boolean
  newsletterSubscription: boolean
  password: string
  profile: Profile
  profileCompleted?: boolean
  usertype: UserType
  workPlace: Workplace
  zipcode: number
  defaultLanguage?: string
}

export type UserType = 'TEACHER_INNOVATOR' | 'TEACHER_CURIOUS' | 'STUDENT'
export type Profile = 'TEACHER' | 'STUDENT' | 'SCHOOL'
