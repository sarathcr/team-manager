import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { of, Observable } from 'rxjs'
import { catchError, mapTo, tap } from 'rxjs/operators'
import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login'
import { LoginInfo, LoginPayload } from '../constants/model/login'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN'
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN'
  loggedUser: LoginInfo

  constructor(
    private http: HttpClient,
    private authService: SocialAuthService
  ) {
    this.authService.authState.subscribe((user) => {
      console.log('user:', user)
    })
  }

  login(user: LoginPayload): Observable<boolean> {
    return this.http
      .post<any>(`${environment.apiUrl.userService}/users/login`, user)
      .pipe(
        tap((login: LoginInfo) => {
          this.doLoginUser(login)
        }),
        mapTo(true),
        catchError((error) => {
          console.log(error.error)
          return of(false)
        })
      )
  }

  activate(): Observable<boolean> {
    const userId = this.loggedUser.id
    return this.http.post<any>(`${environment.apiUrl.userService}/users/${userId}/activation`,
    {
      userId
    }).pipe(
      mapTo(true),
      catchError((error) => {
        console.log(error.error)
        return of(false)
      })
    )
  }

  googleLogin(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
  }

  googleLogout(): void {
    this.authService.signOut()
  }

  // WIP
  // logout(): Observable<boolean> {
  //   return this.http
  //     .post<any>(`${environment.apiUrl.userService}/users/logout`, {
  //       refreshToken: this.getRefreshToken(),
  //     })
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

  refreshToken(): Observable<LoginInfo> {
    return this.http
      .post<any>(`${environment.apiUrl.userService}/users/refresh`, {
        refreshToken: this.getRefreshToken(),
      })
      .pipe(
        tap((tokens: LoginInfo) => {
          localStorage.setItem(this.JWT_TOKEN, tokens.token)
        })
      )
  }

  getJwtToken(): any {
    return localStorage.getItem(this.JWT_TOKEN)
  }

  private getRefreshToken(): any {
    return localStorage.getItem(this.REFRESH_TOKEN)
  }

  private doLoginUser(login: LoginInfo): void {
    this.loggedUser = { id: login.id, email: login.email, activa: login.activa }
    if (login.activa) {
      localStorage.setItem(this.JWT_TOKEN, login.token)
    }
    // localStorage.setItem(this.REFRESH_TOKEN, login.refreshToken)
  }

  doLogoutUser(): void {
    this.loggedUser = null
    localStorage.removeItem(this.JWT_TOKEN)
    localStorage.removeItem(this.REFRESH_TOKEN)
  }
}
