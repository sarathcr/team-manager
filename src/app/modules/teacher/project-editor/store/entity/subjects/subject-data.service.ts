import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import {
  AcademicYear,
  Subject,
} from 'src/app/modules/teacher/project-editor/constants/model/project.model'
import { environment } from 'src/environments/environment'

@Injectable()
export class SubjectDataService extends DefaultDataService<AcademicYear> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private store: Store
  ) {
    super('Subject', http, httpUrlGenerator)
  }

  getAll(): Observable<Subject[] | any> {
    return this.http
      .get<Subject[]>(`${environment.apiUrl.curriculumService}/subjects`)
      .pipe(
        map((response) => response),
        catchError((err) =>
          of(
            this.store.dispatch({
              type: '[Subject] @ngrx/data/query-many/failure',
              payload: err.message,
              error: { status: err.error.status, error: err.error.error },
            })
          )
        )
      )
  }
}
