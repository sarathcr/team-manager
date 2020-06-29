import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { environment } from 'src/environments/environment'

@Injectable()
export class EvaluationCriteriaDataService extends DefaultDataService<object> {
  regionId: number
  academicyearId: number
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('EvaluationCriteria', http, httpUrlGenerator)

  }
  getWithQuery(parm: any): Observable<any> {
    return this.http.get<object[]>(`${environment.apiUrl.curriculumService}/evaluationcriteria/${parm.criteriaId}/basicskills`)
      .pipe(map(res => res))
  }
}
