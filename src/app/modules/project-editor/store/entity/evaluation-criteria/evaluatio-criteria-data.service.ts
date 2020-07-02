import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { environment } from 'src/environments/environment'

import { EvaluationCriteria } from 'src/app/shared/constants/evaluation-criteria.model'

@Injectable()
export class EvaluationCriteriaDataService extends DefaultDataService<EvaluationCriteria> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('EvaluationCriteria', http, httpUrlGenerator)

  }
  getWithQuery(criteriaIds: string): Observable<EvaluationCriteria[]> {
    return this.http.get<EvaluationCriteria[]>(`${environment.apiUrl.curriculumService}/evaluationcriteria/${criteriaIds}`)
      .pipe(map(res => res))
  }
}
