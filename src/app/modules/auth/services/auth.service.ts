import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login'
import { Observable, of } from 'rxjs'
import { catchError, mapTo, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { GoogleAuthPayload, LoginInfo, LoginPayload, RegisterPayload } from '../constants/model/login'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN'
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN'
  loggedUser: LoginInfo
  rememberMe = false
  linkExpired = false
  userId: string

  constructor(
    private http: HttpClient,
    private authService: SocialAuthService
  ) {
    this.setRememberMe(this.JWT_TOKEN)
  }

  login(user: LoginPayload): Observable<boolean> {
    return this.http
      .post<any>(`${environment.apiUrl.userService}/users/login`, user)
      .pipe(
        tap((login: LoginInfo) => {
          this.rememberMe = user.rememberMe
          this.doLoginUser(login)
        }),
        mapTo(true),
        catchError(() => {
          return of(false)
        })
      )
  }

  signUp(user: RegisterPayload): Observable<boolean> {
    return this.http
    .post<any>(`${environment.apiUrl.userService}/users`, user)
    .pipe(
      tap((login: LoginInfo) => {
        this.doLoginUser(login)
      }),
      mapTo(true),
      catchError(() => {
        return of(false)
      })
    )
  }

  sendActivation(): Observable<boolean> {
    const userId = this.loggedUser.id
    return this.http
      .post<any>(
        `${environment.apiUrl.userService}/users/${userId}/sendActivation`,
        {
          userId,
        }
      )
      .pipe(
        mapTo(true),
        catchError(() => {
          return of(false)
        })
      )
  }

  sendActivationLink(userId: string, link: string): Observable<boolean> {
    this.userId = userId
    return this.http
      .post<any>(
        `${environment.apiUrl.userService}/users/${userId}/activate/${link}`,
        {
          userId,
          link
        }
      )
      .pipe(
        mapTo(true),
        catchError((error) => {
          if (error.error?.message?.includes('expired')) {
            this.linkExpired = true
          }
          return of(false)
        })
      )
  }

  sendRecoveryLink(userId: string, link: string): Observable<boolean> {
    this.userId = userId
    return this.http
      .post<any>(
        `${environment.apiUrl.userService}/users/${userId}/recovery/${link}`,
        {
          userId,
          link
        }
      )
      .pipe(
        mapTo(true),
        catchError((error) => {
          if (error.error?.message?.includes('expired')) {
            this.linkExpired = true
          }
          return of(false)
        })
      )
  }

  sendRecovery(email: string): Observable<boolean> {
    return this.http
      .post<any>(`${environment.apiUrl.userService}/users/sendRecovery`, { email })
      .pipe(
        mapTo(true),
        catchError(() => {
          return of(false)
        })
      )
  }

  resetPassword(password: string, userId: string): Observable<boolean> {
    return this.http.post<any>(
      `${environment.apiUrl.userService}/users/${userId}/resetPassword`, { password }
    ).pipe(
      mapTo(true),
      catchError(() => {
        return of(false)
      })
    )
  }

  googleLogin(): any {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
  }

  googleAuth(
    payload: GoogleAuthPayload,
    rememberMe: boolean = false,
  ): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrl.userService}/users/login/google`, payload)
    .pipe(
      tap((login: LoginInfo) => {
        this.rememberMe = rememberMe
        this.doLoginUser(login)
      }),
      mapTo(true),
      catchError(() => {
        return of(false)
      })
    )
  }

  googleLogout(): void {
    this.authService.signOut()
  }

  // WIP
  // logout(): Observable<boolean> {
  //   return this.http
  //     .post<any>(`${environment.apiUrl.userService}/users/logout`)
  //     .pipe(
  //       tap(() => this.doLogoutUser()),
  //       mapTo(true),
  //       catchError((error) => {
  //         console.log(error.error)
  //         return of(false)
  //       })
  //     )
  // }

  logout(): void {
    this.doLogoutUser()
  }

  isLoggedIn(): boolean {
    return !!this.getJwtToken()
  }

  private getJwtToken(): any {
    return localStorage.getItem(this.JWT_TOKEN) || sessionStorage.getItem(this.JWT_TOKEN) 
  }

  private doLoginUser(login: LoginInfo): void {
    this.loggedUser = { id: login.id, email: login.email, activa: login.activa }
    if (login.activa) {
      this.setStorageItem(this.JWT_TOKEN, login.token)
    }
  }

  private doLogoutUser(): void {
    this.loggedUser = null
    this.getOrRemoveStorageItem(this.JWT_TOKEN, 'removeItem')
    this.getOrRemoveStorageItem(this.REFRESH_TOKEN, 'removeItem')
  }

  private setStorageItem(key: string, value: string): void {
    if (this.rememberMe) {
      localStorage.setItem(key, value)
    }
    else {
      sessionStorage.setItem(key, value)
    }
  }

  private getOrRemoveStorageItem(value: string, storageType: 'getItem' | 'removeItem'): void {
    if (this.rememberMe) {
      localStorage[storageType](value)
    }
    else {
      sessionStorage[storageType](value)
    }
  }

  private setRememberMe(token: string): void {
    this.rememberMe = !!localStorage.getItem(token)
  }
}
