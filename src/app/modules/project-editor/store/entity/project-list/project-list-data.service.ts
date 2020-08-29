import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { ProjectList } from '../../../constants/model/project.model'

@Injectable()
export class ProjectListDataService extends DefaultDataService<ProjectList> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private store: Store
  ) {
    super('ProjectList', http, httpUrlGenerator)
  }

  getById(pageNumber: number): Observable<ProjectList | any> {
    const pageSize = 10
    return this.http
      .get<ProjectList>(
        `${environment.apiUrl.projectService}/projects/${pageNumber}/${pageSize}`
      )
      .pipe(
        map((res) => {
          return { ...res, pageNumber, pageSize }
        }),
        catchError((err) =>
          of(
            this.store.dispatch({
              type: '[ProjectList] @ngrx/data/query-by-key/failure',
              payload: err.message,
              error: { status: err.error.status, error: err.error.error },
            })
          )
        )
      )
  }
}
