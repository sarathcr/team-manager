import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { environment } from 'src/environments/environment'

import { Curriculum } from '../../../constants/model/curriculum.model'

@Injectable()
export class CurriculumBasicSkillsDataService extends DefaultDataService<Curriculum> {
  regionId: number
  academicyearId: number
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('CurriculumBasicSkills', http, httpUrlGenerator)
  }

  getWithQuery(parm: any): Observable<Curriculum[]> {
    const urlstring = `/regions/${parm.regionId}/academicyears/${parm.academicyearId}/curriculum/basicskills`
    return this.http.get<Curriculum[]>(
      `${environment.apiUrl.curriculumService}` + urlstring
      )
      .pipe(
          map(res => res)
      )
}
}
