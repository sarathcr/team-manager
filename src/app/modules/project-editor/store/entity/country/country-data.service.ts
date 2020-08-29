import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { Country } from 'src/app/modules/project-editor/constants/model/project.model'
import { environment } from 'src/environments/environment'

@Injectable()
export class CountryDataService extends DefaultDataService<Country> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private store: Store
  ) {
    super('Country', http, httpUrlGenerator)
  }

  getAll(): Observable<Country[] | any> {
    return this.http
      .get<Country[]>(`${environment.apiUrl.curriculumService}/countries`)
      .pipe(
        map((res) => res),
        catchError((err) =>
          of(
            this.store.dispatch({
              type: '[Country] @ngrx/data/query-all/failure',
              payload: err.message,
              error: { status: err.error.status, error: err.error.error },
            })
          )
        )
      )
  }
}
