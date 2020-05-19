import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Project } from 'src/app/shared/models/project.model';

@Injectable()
export class ProjectEntityService extends EntityCollectionServiceBase<Project> {

    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('Project', serviceElementsFactory);
    }

}