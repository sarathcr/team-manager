import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { User } from '../../../constants/model/login.model'

@Injectable()
export class UserDataService extends DefaultDataService<User> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private store: Store
  ) {
    super('User', http, httpUrlGenerator)
  }

  getById(id: any): Observable<User | any> {
    return this.http
      .get<User>(`${environment.apiUrl.userService}/users/${id}`)
      .pipe(
        map((res) => res),
        catchError((err) =>
          of(
            this.store.dispatch({
              type: '[User] @ngrx/data/query-by-key/failure',
              payload: err.message,
              error: { status: err.error.status, error: err.error.error },
            })
          )
        )
      )
  }

  update(data: any): Observable<User | any> {
    return this.http
      .put<User>(`${environment.apiUrl.userService}/users`, data.changes)
      .pipe(
        map((res) => res),
        catchError((err) =>
          of(
            this.store.dispatch({
              type: '[User] @ngrx/data/update-one/failure',
              payload: err.message,
              error: { status: err.error.status, error: err.error.error },
            })
          )
        )
      )
  }
}
