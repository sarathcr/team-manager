import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Step } from '../../constants/step.model';

@Injectable()
export class StepStatusEntityService extends EntityCollectionServiceBase<Step> {
    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('StepStatus', serviceElementsFactory);
    }
}