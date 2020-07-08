import { Injectable } from '@angular/core'
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data'
import { StepState } from '../../../constants/model/project.model'

@Injectable()
export class StepStatusEntityService extends EntityCollectionServiceBase<StepState> {
    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('StepStatus', serviceElementsFactory)
    }
}
