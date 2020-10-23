import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { EntityDataService, EntityDefinitionService } from '@ngrx/data'
import { CardListDataService } from './entity/card-list/card-list-data.service'
import { CardListEntityService } from './entity/card-list/card-list-entity.service'
import { entityMetadata } from './entity/entity-metadata'
import { StudentActivityDataService } from './entity/student-activity/student-activity-data.service'
import { StudentActivityEntityService } from './entity/student-activity/student-activity-entity.service'
import { SubjectDataService } from './entity/subjects/subject-data.service'
import { SubjectEntityService } from './entity/subjects/subject-entity.service'

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    CardListEntityService,
    CardListDataService,
    SubjectEntityService,
    SubjectDataService,
    StudentActivityEntityService,
    StudentActivityDataService,
  ],
})
export class ExperiencesStoreModule {
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private cardListDataService: CardListDataService,
    private subjectDataservice: SubjectDataService,
    private studentActivityDataservice: StudentActivityDataService
  ) {
    eds.registerMetadataMap(entityMetadata)
    entityDataService.registerServices({
      CardList: cardListDataService,
      Subject: subjectDataservice,
      StudentActivity: studentActivityDataservice,
    })
  }
}
