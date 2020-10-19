import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  )

  constructor(public authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // if (this.authService.isLoggedIn()) {
    //   request = this.addToken(request, this.authService.isLoggedIn())
    // }

    return next.handle(request)
    // WIP
    // return next.handle(request).pipe(
    //   catchError((error) => {
    //     if (error instanceof HttpErrorResponse && error.status === 404) {
    //       console.log('intercept call')
    //       // return this.handle401Error(request, next)
    //     } else {
    //       return throwError(error)
    //     }
    //   })
    // )
  }

  private addToken(request: HttpRequest<any>, token: string): any {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  // WIP
  // private handle401Error(request: HttpRequest<any>, next: HttpHandler): any {
  //   console.log('requesitn 401')
  //   if (!this.isRefreshing) {
  //     this.isRefreshing = true
  //     this.refreshTokenSubject.next(null)

  //     return this.authService.refreshToken().pipe(
  //       switchMap((token: any) => {
  //         this.isRefreshing = false
  //         this.refreshTokenSubject.next(token.jwt)
  //         return next.handle(this.addToken(request, token.jwt))
  //       })
  //     )
  //   } else {
  //     return this.refreshTokenSubject.pipe(
  //       filter((token) => token != null),
  //       take(1),
  //       switchMap((jwt) => {
  //         return next.handle(this.addToken(request, jwt))
  //       })
  //     )
  //   }
  // }
}
