import { Injectable } from '@angular/core'
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data'
import { CurriculumAcademicYear } from 'src/app/modules/shared/constants/model/curriculum-data.model'

@Injectable()
export class AcademicYearEntityService extends EntityCollectionServiceBase<
  CurriculumAcademicYear
> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('AcademicYear', serviceElementsFactory)
  }
}
