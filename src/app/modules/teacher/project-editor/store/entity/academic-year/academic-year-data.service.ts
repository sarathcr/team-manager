import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { CurriculumAcademicYear } from 'src/app/modules/shared/constants/model/curriculum-data.model'
import { environment } from 'src/environments/environment'

@Injectable()
export class AcademicYearDataService extends DefaultDataService<
  CurriculumAcademicYear
> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private store: Store
  ) {
    super('AcademicYear', http, httpUrlGenerator)
  }

  getWithQuery(curriculumId: any): Observable<CurriculumAcademicYear[] | any> {
    return this.http
      .get<CurriculumAcademicYear[]>(
        `${environment.apiUrl.curriculumService}/curriculums/${curriculumId}/academicyears`
      )
      .pipe(
        map((response) => [
          { curriculumId: +curriculumId, academicYears: response },
        ]),
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

  getAll(): Observable<CurriculumAcademicYear[] | any> {
    return this.http
      .get<CurriculumAcademicYear[]>(
        `${environment.apiUrl.curriculumService}/academicyears`
      )
      .pipe(
        map((response) => [{ curriculumId: 0, academicYears: response }]),
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
