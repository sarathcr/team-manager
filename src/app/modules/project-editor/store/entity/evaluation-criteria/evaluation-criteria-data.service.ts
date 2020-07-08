import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { environment } from 'src/environments/environment'

import { EvaluationCriteria } from '../../../constants/model/project.model'

@Injectable()
export class EvaluationCriteriaDataService extends DefaultDataService<EvaluationCriteria> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('EvaluationCriteria', http, httpUrlGenerator)

  }
  getById(id: any): Observable<any> {
    return this.http.get<EvaluationCriteria>(`${environment.apiUrl.curriculumService}/evaluationcriteria/${id}/basicskills`)
      .pipe(map(res => res))
  }
  getWithQuery(criteriaIds: string): Observable<EvaluationCriteria[]> {
    return this.http.get<EvaluationCriteria[]>(`${environment.apiUrl.curriculumService}/evaluationcriteria/${criteriaIds}`)
      .pipe(map(res => res))
  }
}
