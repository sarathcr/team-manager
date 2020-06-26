import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Observable } from 'rxjs'

import { environment } from 'src/environments/environment'
import { Block, BlockData } from 'src/app/shared/constants/block.model'
import { map } from 'rxjs/operators'

@Injectable()
export class BlockDataService extends DefaultDataService<BlockData> {

  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Block', http, httpUrlGenerator)
  }

  getWithQuery(params: any): Observable<any> {
    const gradeId = params.gradeId
    const subjectId = params.subjectId
    return this.http.get<Block[]>(
      `${environment.apiUrl.curriculumService}/grade/${gradeId}/subject/${subjectId}/blocks`
    ).pipe(map(blockData => {
      if (blockData?.length) {
        return [{ id: `${gradeId}-${subjectId}`, blockData, gradeId: +gradeId, subjectId: +subjectId }]
      }
    }
    ))
  }

}
