import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { CurriculumGrade } from '../../../constants/model/curriculum.model'

@Injectable()
export class CurriculumGradesDataService extends DefaultDataService<
  CurriculumGrade
> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private store: Store
  ) {
    super('CurriculumGrades', http, httpUrlGenerator)
  }

  getWithQuery(curriculumId: any): Observable<CurriculumGrade[] | any> {
    return this.http
      .get<CurriculumGrade[]>(
        `${environment.apiUrl.curriculumService}/curriculums/${curriculumId}/grades`
      )
      .pipe(
        map((res) => res),
        catchError((err) =>
          of(
            this.store.dispatch({
              type: '[CurriculumGrades] @ngrx/data/query-by-key/failure',
              payload: err.message,
              error: { status: err.error.status, error: err.error.error },
            })
          )
        )
      )
  }
}
