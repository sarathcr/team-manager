import { Injectable } from '@angular/core'
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data'
import { Curriculum } from '../../../constants/model/curriculum.model'

@Injectable()
export class CurriculumBasicSkillsEntityService extends EntityCollectionServiceBase<
  Curriculum
> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('CurriculumBasicSkills', serviceElementsFactory)
  }
}
