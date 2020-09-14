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

export class User {
  id: number
  usertype: UserType
  active:	boolean
  email:	string
  lastName:	string
  mailSended:	boolean
  name:	string
  newsletterSubscription:	boolean
  password:	string
  profile:	Profile
  roles: Roles[]
  surName:	string
  zipcode: number
}

export class Roles{
  id: number
  role:	string
}

export type UserType = 'TEACHER_INNOVATOR' | 'TEACHER_CURIOUS' | 'STUDENT'
export type Profile = 'TEACHER' | 'STUDENT' | 'SCHOOL'
