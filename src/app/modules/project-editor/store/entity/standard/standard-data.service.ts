import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Observable, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { Standard } from '../../../constants/model/project.model'
import { Store } from '@ngrx/store'
@Injectable()
export class StandardDataService extends DefaultDataService<Standard> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, private store: Store) {
    super('Standard', http, httpUrlGenerator)
  }
  getWithQuery(criteriaIds: string): Observable<Standard[] | any> {
    return this.http.get<Standard[]>(`${environment.apiUrl.curriculumService}/evaluationcriteria/${criteriaIds}/allstandards`)
      .pipe(map(res => res),
          catchError(err => of(this.store.dispatch({
              type: '[Grade] @ngrx/data/query-many/failure',
              payload: err.message,
              error: { status: err.error.status, error: err.error.error }
          })))
      )
  }
}
