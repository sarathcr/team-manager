import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { AcademicYear } from 'src/app/shared/constants/academic-year.model';

@Injectable()
export class AcademicYearEntityService extends EntityCollectionServiceBase<AcademicYear> {
    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('AcademicYear', serviceElementsFactory);
    }
}
