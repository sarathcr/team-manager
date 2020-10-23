import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { CardList } from 'src/app/modules/shared/constants/model/card-experience.model'
import { environment } from 'src/environments/environment'

@Injectable()
export class CardListDataService extends DefaultDataService<CardList> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private router: Router,
    private store: Store
  ) {
    super('CardList', http, httpUrlGenerator)
  }

  getWithQuery(query: string): Observable<CardList[] | any> {
    const pageSize = 6
    return this.http
      .get<CardList[]>(
        `${environment.apiUrl.projectService}/projects/private${query}`
      )
      .pipe(
        map((res) => {
          const updatedRes = [{ ...res, pageId: query, pageSize }]
          return updatedRes
        }),
        catchError((err) => {
          // this.errorHandler(err)
          return of(
            this.store.dispatch({
              type: '[CardList] @ngrx/data/query-many/failure',
              payload: err.message,
              error: { status: err.error.status, error: err.error.error },
            })
          )
        })
      )
  }
  errorHandler(error: HttpErrorResponse): any {
    if (error.status === 404) {
      this.router.navigate(['not-found'])
    }
  }
}
