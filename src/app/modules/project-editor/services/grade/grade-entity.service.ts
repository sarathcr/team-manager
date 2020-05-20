import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Grade } from 'src/app/shared/constants/grade.model';

@Injectable()
export class GradeEntityService extends EntityCollectionServiceBase<Grade> {
    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('Grade', serviceElementsFactory);
    }
}
