import { Injectable } from '@angular/core'
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data'
import { EvaluationCriteria } from 'src/app/shared/constants/evaluation-criteria.model'

@Injectable()
export class EvaluationCriteriaEntityService extends EntityCollectionServiceBase<EvaluationCriteria> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('EvaluationCriteria', serviceElementsFactory)
  }
}
