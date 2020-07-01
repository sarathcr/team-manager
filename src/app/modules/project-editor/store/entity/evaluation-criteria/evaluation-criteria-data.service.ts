import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { environment } from 'src/environments/environment'
import { EvaluationCriteria } from 'src/app/shared/constants/evaluation-criteria.model'

@Injectable()
export class EvaluationCriteriaDataService extends DefaultDataService<object> {
  regionId: number
  academicyearId: number
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('EvaluationCriteria', http, httpUrlGenerator)

  }
  getById(id: any): Observable<any> {
    return this.http.get<EvaluationCriteria>(`${environment.apiUrl.curriculumService}/evaluationcriteria/${id}/basicskills`)
      .pipe(map(res => res))
  }
  getWithQuery(parm: any): Observable<any> {
    return this.http.get<EvaluationCriteria>(`${environment.apiUrl.curriculumService}/evaluationcriteria/${parm}`)
      .pipe(map(res => res))
  }
}
