import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { ProjectList } from '../../../constants/model/project.model'
import { StudentGroup } from '../../../modules/activity/constants/model/form-elements.model'

@Injectable()
export class StudentGroupsDataService extends DefaultDataService<ProjectList> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private store: Store
  ) {
    super('StudentGroups', http, httpUrlGenerator)
  }

  getAll(): Observable<StudentGroup[] | any> {
    return this.http
      .get<StudentGroup[]>(
        `${environment.apiUrl.projectService}/studentgroups/`
      )
      .pipe(
        map((res) => res),
        catchError((err) =>
          of(
            this.store.dispatch({
              type: '[StudentGroups] @ngrx/data/query-many/failure',
              payload: err.message,
            })
          )
        )
      )
  }
}
