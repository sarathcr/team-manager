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
