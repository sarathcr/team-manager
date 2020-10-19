import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

import { environment } from 'src/environments/environment'

import { Store } from '@ngrx/store'
import { Curriculum } from '../../../constants/model/curriculum.model'

@Injectable()
export class CurriculumBasicSkillsDataService extends DefaultDataService<
  Curriculum
> {
  regionId: number
  academicyearId: number
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private store: Store
  ) {
    super('CurriculumBasicSkills', http, httpUrlGenerator)
  }

  getWithQuery(curriculumId: any): Observable<Curriculum[] | any> {
    const urlstring = `/curriculums/${curriculumId}/basicskills`
    return this.http
      .get<Curriculum[]>(`${environment.apiUrl.curriculumService}` + urlstring)
      .pipe(
        map((res) => res),
        catchError((err) =>
          of(
            this.store.dispatch({
              type: '[CurriculumBasicSkills] @ngrx/data/query-many/failure',
              payload: err.message,
              error: { status: err.error.status, error: err.error.error },
            })
          )
        )
      )
  }
}
