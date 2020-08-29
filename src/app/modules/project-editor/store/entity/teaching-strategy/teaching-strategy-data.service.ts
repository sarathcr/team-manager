import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { ProjectList } from '../../../constants/model/project.model'
import { TeachingStrategy } from '../../../modules/activity/constants/model/form-elements.model'

@Injectable()
export class TeachingStrategyDataService extends DefaultDataService<
  ProjectList
> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private store: Store
  ) {
    super('TeachingStrategy', http, httpUrlGenerator)
  }

  getAll(): Observable<TeachingStrategy[] | any> {
    return this.http
      .get<TeachingStrategy[]>(
        `${environment.apiUrl.projectService}/teachingstrategies/`
      )
      .pipe(
        map((res) => res),
        catchError((err) =>
          of(
            this.store.dispatch({
              type: '[TeachingStrategy] @ngrx/data/query-many/failure',
              payload: err.message,
            })
          )
        )
      )
  }
}
