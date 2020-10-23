import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { CollaboratorList } from '../../../constants/model/collaborator'

@Injectable()
export class CollaboratorListDataService extends DefaultDataService<
  CollaboratorList
> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private store: Store
  ) {
    super('CollaboratorList', http, httpUrlGenerator)
  }

  getWithQuery(query: string): Observable<CollaboratorList[] | any> {
    const splitQuery = query.split('|')
    const projectId = splitQuery[0]
    const queryString = splitQuery[1]
    return this.http
      .get<CollaboratorList[]>(
        `${
          environment.apiUrl.projectService
        }/projects/${+projectId}/collaborators${queryString}`
      )
      .pipe(
        map((res) => [{ ...res }]),
        catchError((err) =>
          of(
            this.store.dispatch({
              type: '[CollaboratorList] @ngrx/data/query-many/failure',
              payload: err.message,
              error: { status: err.error.status, error: err.error.error },
            })
          )
        )
      )
  }
}
