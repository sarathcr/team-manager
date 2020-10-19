import { Injectable } from '@angular/core'
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data'
import { CurriculumGrade } from '../../../constants/model/curriculum.model'

@Injectable()
export class CurriculumGradesEntityService extends EntityCollectionServiceBase<
  CurriculumGrade
> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('CurriculumGrades', serviceElementsFactory)
  }
}
