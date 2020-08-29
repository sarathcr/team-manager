import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

import { environment } from 'src/environments/environment'

import { Store } from '@ngrx/store'
import { EvaluationCriteria } from '../../../constants/model/project.model'

@Injectable()
export class EvaluationCriteriaDataService extends DefaultDataService<
  EvaluationCriteria
> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private store: Store
  ) {
    super('EvaluationCriteria', http, httpUrlGenerator)
  }
  getById(id: any): Observable<any> {
    return this.http
      .get<EvaluationCriteria>(
        `${environment.apiUrl.curriculumService}/evaluationcriteria/${id}/basicskills`
      )
      .pipe(
        map((res) => res),
        catchError((err) =>
          of(
            this.store.dispatch({
              type: '[EvaluationCriteria] @ngrx/data/query-by-key/failure',
              payload: err.message,
            })
          )
        )
      )
  }
  getWithQuery(criteriaIds: string): Observable<EvaluationCriteria[] | any> {
    return this.http
      .get<EvaluationCriteria[]>(
        `${environment.apiUrl.curriculumService}/evaluationcriteria/${criteriaIds}`
      )
      .pipe(
        map((res) => res),
        catchError((err) =>
          of(
            this.store.dispatch({
              type: '[EvaluationCriteria] @ngrx/data/query-many/failure',
              payload: err.message,
              error: { status: err.error.status, error: err.error.error },
            })
          )
        )
      )
  }
}
