import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Observable } from 'rxjs'

import { environment } from 'src/environments/environment'
import { Block } from 'src/app/shared/constants/block.model'
import { map } from 'rxjs/operators'

@Injectable()
export class BlockDataService extends DefaultDataService<Block> {

  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Block', http, httpUrlGenerator)
  }

  getWithQuery(params: any): Observable<Block[]> {
    const subjectId = params.subjectId
    if (params.gradeIds) {
      const gradeIds = params.gradeIds
      return this.http.get<Block[]>(
        `${environment.apiUrl.curriculumService}/grade/list/${gradeIds}/subject/${subjectId}/blocks`)
        .pipe(map(blockData => blockData)
      )
    }

  }

}
