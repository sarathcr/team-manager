import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Observable } from 'rxjs'

import { environment } from 'src/environments/environment'
import { Block } from 'src/app/shared/constants/block.model'

@Injectable()
export class BlockDataService extends DefaultDataService<Block> {

  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Block', http, httpUrlGenerator)
  }

  getWithQuery(params: any): Observable<Block[]> {
    return this.http.get<Block[]>(
      `${environment.apiUrl.curriculumService}/grade/${params.gradeId}/subject/${params.subjectId}/blocks`
    )
  }

}
