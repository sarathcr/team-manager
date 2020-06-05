import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Project } from 'src/app/shared/constants/project.model';

@Injectable()
export class ProjectEntityService extends EntityCollectionServiceBase<any> {

    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('Project', serviceElementsFactory);
    }

}