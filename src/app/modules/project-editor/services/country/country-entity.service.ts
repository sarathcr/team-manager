import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Country } from 'src/app/shared/models/country.model';

@Injectable()
export class CountryEntityService extends EntityCollectionServiceBase<Country> {
    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('Country', serviceElementsFactory);
    }
}
