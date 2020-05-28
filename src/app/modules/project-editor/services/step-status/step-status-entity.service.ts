import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { StepStatus } from '../../constants/step-status.model';

@Injectable()
export class StepStatusEntityService extends EntityCollectionServiceBase<StepStatus> {
    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('StepStatus', serviceElementsFactory);
    }
}