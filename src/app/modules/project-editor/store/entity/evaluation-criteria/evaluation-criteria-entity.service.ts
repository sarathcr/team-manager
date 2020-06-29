import { Injectable } from '@angular/core'
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data'

@Injectable()
export class EvaluationCriteriaEntityService extends EntityCollectionServiceBase<object[]> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('EvaluationCriteria', serviceElementsFactory)
  }
}
