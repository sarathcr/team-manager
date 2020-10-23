import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { StudentActivityRP } from '../../../constants/model/activities.model'

@Injectable()
export class StudentActivityDataService extends DefaultDataService<
  StudentActivityRP
> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private store: Store
  ) {
    super('StudentActivity', http, httpUrlGenerator)
  }

  getWithQuery(param: any): Observable<StudentActivityRP[] | any> {
    return this.http
      .get<StudentActivityRP[]>(
        `${environment.apiUrl.projectService}/student/${param.studentId}/project/${param.projectId}/getActivities
        `
      )
      .pipe(
        map((res) => [
          {
            ...res,
            projectId: +param.projectId,
            studentId: +param.studentId,
          },
        ]),
        catchError((err) =>
          of(
            this.store.dispatch({
              type: '[StudentActivity] @ngrx/data/query-many/failure',
              payload: err.message,
              error: { status: err.error.status, error: err.error.error },
            })
          )
        )
      )
  }
}
