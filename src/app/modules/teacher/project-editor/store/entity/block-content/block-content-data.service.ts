import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

import { environment } from 'src/environments/environment'

import { BlockWithQuery } from '../../../constants/model/curriculum.model'

@Injectable()
export class BlockContentDataService extends DefaultDataService<
  BlockWithQuery
> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private store: Store
  ) {
    super('BlockContent', http, httpUrlGenerator)
  }

  getWithQuery(query: any): Observable<BlockWithQuery[] | any> {
    return this.http
      .get<BlockWithQuery[]>(`${environment.apiUrl.curriculumService}/${query}`)
      .pipe(
        map((blockData) => [{ id: query, blocks: blockData }]),
        catchError((err) =>
          of(
            this.store.dispatch({
              type: '[BlockContent] @ngrx/data/query-many/failure',
              payload: err.message,
              error: { status: err.error.status, error: err.error.error },
            })
          )
        )
      )
  }
}
