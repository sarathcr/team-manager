import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { Stage } from '../../../constants/model/curriculum.model'

@Injectable()
export class StageDataService extends DefaultDataService<string> {
  regionId: number
  academicyearId: number
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private store: Store
  ) {
    super('Stage', http, httpUrlGenerator)
  }
  getAll(): Observable<string[] | any> {
    return this.http
      .get<string[]>(`${environment.apiUrl.curriculumService}/stages`)
      .pipe(
        map((res) =>
          res.map((stage) => ({
            id: stage,
            name: stage,
          }))
        ),
        catchError((err) =>
          of(
            this.store.dispatch({
              type: '[Stage] @ngrx/data/query-all/failure',
              payload: err.message,
              error: { status: err.error.status, error: err.error.error },
            })
          )
        )
      )
  }
}
