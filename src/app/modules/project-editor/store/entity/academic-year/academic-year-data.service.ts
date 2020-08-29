import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { AcademicYear } from 'src/app/modules/project-editor/constants/model/project.model'
import { environment } from 'src/environments/environment'

@Injectable()
export class AcademicYearDataService extends DefaultDataService<AcademicYear> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private store: Store
  ) {
    super('AcademicYear', http, httpUrlGenerator)
  }

  getWithQuery(curriculumId: any): Observable<AcademicYear[] | any> {
    return this.http
      .get<AcademicYear[]>(
        `${environment.apiUrl.curriculumService}/curriculums/${curriculumId}/academicyears`
      )
      .pipe(
        map((response) =>
          response.map((res) => ({ ...res, curriculumId: +curriculumId }))
        ),
        catchError((err) =>
          of(
            this.store.dispatch({
              type: '[AcademicYear] @ngrx/data/query-many/failure',
              payload: err.message,
              error: { status: err.error.status, error: err.error.error },
            })
          )
        )
      )
  }
}
