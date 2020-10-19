import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { ContextualHelp } from '../../../constants/model/help.model'

@Injectable()
export class HelpDataService extends DefaultDataService<ContextualHelp> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private store: Store
  ) {
    super('ContextualHelp', http, httpUrlGenerator)
  }

  getAll(): Observable<ContextualHelp[] | any> {
    return this.http
      .get<ContextualHelp[]>(`${environment.apiUrl.projectService}/steps`)
      .pipe(
        map((res) => res),
        catchError((err) =>
          of(
            this.store.dispatch({
              type: '[ContextualHelp] @ngrx/data/query-many/failure',
              payload: err.message,
            })
          )
        )
      )
  }
  getWithQuery(quary: string): Observable<ContextualHelp | any> {
    return this.http
      .get<ContextualHelp>(`${environment.apiUrl.projectService}${quary}`)
      .pipe(
        map((res) => {
          return [{ id: quary, ...res }]
        }),
        catchError((err) =>
          of(
            this.store.dispatch({
              type: '[ContextualHelp] @ngrx/data/query-by-key/failure',
              payload: err.message,
              error: { status: err.error.status, error: err.error.error },
            })
          )
        )
      )
  }
}
