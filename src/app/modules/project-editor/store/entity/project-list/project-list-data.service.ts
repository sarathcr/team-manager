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

  getWithQuery(query: string): Observable<ProjectList[] | any> {
    const querys = query.split('/')
    return this.http
      .get<ProjectList[]>(
        `${environment.apiUrl.projectService}/projects/${query}`
      )
      .pipe(
        map((res) => {
          const updatedRes = [{ ...res, pageId: query, pageSize: +querys[1] }]
          return updatedRes
        }),
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
