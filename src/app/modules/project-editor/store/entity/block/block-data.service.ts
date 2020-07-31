import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

import { environment } from 'src/environments/environment'

import { Block } from '../../../constants/model/curriculum.model'

@Injectable()
export class BlockDataService extends DefaultDataService<Block> {

  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, private store: Store) {
    super('Block', http, httpUrlGenerator)
  }

  getWithQuery(params: any): Observable<Block[] | any> {
    const subjectId = params.subjectId
    if (params.gradeIds) {
      const gradeIds = params.gradeIds
      return this.http.get<Block[]>(
        `${environment.apiUrl.curriculumService}/grade/list/${gradeIds}/subject/${subjectId}/blocks`)
        .pipe(
          map(blockData => blockData),
          catchError(err => of(this.store.dispatch({
            type: '[Block] @ngrx/data/query-many/failure',
            payload: err.message,
            error: { status: err.error.status, error: err.error.error }
          })))

        )
    }

  }

}
