import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { StepState } from '../../constants/step.model';

@Injectable()
export class StepStatusEntityService extends EntityCollectionServiceBase<StepState> {
    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('StepStatus', serviceElementsFactory);
    }
}