import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Observable, of } from 'rxjs'
import { catchError, mapTo, tap } from 'rxjs/operators'
import { GoogleAuthService } from 'src/app/shared/services/google/google-auth.service'
import { StorageService } from 'src/app/shared/services/storage/storage.service'
import { environment } from 'src/environments/environment'
import {
  GoogleAuthPayload,
  LoginInfo,
  LoginPayload,
  RegisterPayload,
} from '../constants/model/login'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN'
  private readonly GOOGLE_TOKEN = 'GOOGLE_TOKEN'
  private readonly GOOGLE_TOKEN_EXPIRY = 'GOOGLE_TOKEN_EXPIRY'
  loggedUser: LoginInfo
  linkExpired = false
  userId: string
  isLoggedout = false

  constructor(
    private http: HttpClient,
    private router: Router,
    private googleAuthService: GoogleAuthService,
    private storage: StorageService
  ) {
    this.storage.setRememberMe()
  }

  login(user: LoginPayload): Observable<boolean> {
    return this.http
      .post<any>(`${environment.apiUrl.userService}/users/login`, user)
      .pipe(
        tap((login: LoginInfo) => {
          this.storage.rememberMe = user.rememberMe
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
          link,
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
          link,
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
      .post<any>(`${environment.apiUrl.userService}/users/sendRecovery`, {
        email,
      })
      .pipe(
        mapTo(true),
        catchError(() => {
          return of(false)
        })
      )
  }

  resetPassword(password: string, userId: string): Observable<boolean> {
    return this.http
      .post<any>(
        `${environment.apiUrl.userService}/users/${userId}/resetPassword`,
        { password }
      )
      .pipe(
        mapTo(true),
        catchError(() => {
          return of(false)
        })
      )
  }

  googleAuth(
    payload: GoogleAuthPayload,
    rememberMe: boolean = false
  ): Observable<boolean> {
    return this.http
      .post<any>(
        `${environment.apiUrl.userService}/users/login/google`,
        payload
      )
      .pipe(
        tap((login: LoginInfo) => {
          this.storage.rememberMe = rememberMe
          this.doLoginUser(login)
        }),
        mapTo(true),
        catchError(() => {
          return of(false)
        })
      )
  }

  logout(): void {
    this.doLogoutUser()
  }

  isLoggedIn(): boolean {
    return !!this.storage.getData(this.JWT_TOKEN)
  }

  private doLoginUser(login: LoginInfo): void {
    this.loggedUser = { id: login.id, email: login.email, activa: login.activa }
    if (login.activa) {
      this.storage.setStorageItem(this.JWT_TOKEN, login.token)
    }
  }

  private doLogoutUser(): void {
    this.loggedUser = null
    this.isLoggedout = true
    this.googleAuthService.googleLogout()
    this.storage.getOrRemoveStorageItem(this.GOOGLE_TOKEN, 'removeItem')
    this.storage.getOrRemoveStorageItem(this.JWT_TOKEN, 'removeItem')
    this.storage.getOrRemoveStorageItem(this.GOOGLE_TOKEN_EXPIRY, 'removeItem')
    this.router.navigate(['/login'])
  }
}
