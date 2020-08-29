import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { Region } from 'src/app/modules/project-editor/constants/model/project.model'
import { environment } from 'src/environments/environment'

@Injectable()
export class RegionDataService extends DefaultDataService<Region> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private store: Store
  ) {
    super('Region', http, httpUrlGenerator)
  }

  getWithQuery(parm: any): Observable<Region[]> {
    return this.http
      .get<Region[] | any>(
        `${environment.apiUrl.curriculumService}/countries/${parm}/regions`
      )
      .pipe(
        map((res) => res),
        catchError((err) =>
          of(
            this.store.dispatch({
              type: '[Region] @ngrx/data/query-many/failure',
              payload: err.message,
              error: { status: err.error.status, error: err.error.error },
            })
          )
        )
      )
  }
}
