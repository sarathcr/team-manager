import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { StepState } from '../../../constants/model/project.model'

@Injectable()
export class StepStatusDataService extends DefaultDataService<StepState[]> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private store: Store
  ) {
    super('StepStatus', http, httpUrlGenerator)
  }
  update(data: any): Observable<any> {
    const { id: projectId, steps: stateData } = data.changes
    const { stepid, state } = stateData[0]
    const url = `${environment.apiUrl.projectService}/projects/${data.id}/assignStepState`
    return this.http
      .post<any>(url, { stepid, state, projectId })
      .pipe(
        map((res) => res),
        catchError((err) => err),
        catchError((err) =>
          of(
            this.store.dispatch({
              type: '[StepStatus] @ngrx/data/save/update-one/failure',
              payload: err.message,
              error: { status: err.error.status, error: err.error.error },
            })
          )
        )
      )
  }

  getWithQuery(param: string): Observable<any> {
    return this.http
      .get<StepState>(
        `${environment.apiUrl.projectService}/projects/${param}/steps`
      )
      .pipe(
        map((res) => [{ steps: res.steps, id: Number(param) }]),
        catchError((err) =>
          of(
            this.store.dispatch({
              type: '[StepStatus] @ngrx/data/query-many/failure',
              payload: err.message,
              error: { status: err.error.status, error: err.error.error },
            })
          )
        )
      )
  }
}
