import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { Curriculum } from '../../../constants/model/curriculum.model'

@Injectable()
export class CurriculumDataService extends DefaultDataService<Curriculum> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private store: Store
  ) {
    super('Curriculum', http, httpUrlGenerator)
  }

  getWithQuery(parm: any): Observable<Curriculum | any> {
    return this.http
      .get<Curriculum>(
        `${environment.apiUrl.curriculumService}/curriculums/regions/${parm.regionId}/stage/${parm.stage}/curriculum`
      )
      .pipe(
        map((res) => [res]),
        catchError((err) =>
          of(
            this.store.dispatch({
              type: '[Curriculum] @ngrx/data/query-many/failure',
              payload: err.message,
              error: { status: err.error.status, error: err.error.error },
            })
          )
        )
      )
  }
}
