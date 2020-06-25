import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EntityDataService, EntityDefinitionService } from '@ngrx/data'
import { ProjectEntityService } from './entity/project/project-entity.service'
import { ProjectsDataService } from './entity/project/projects-data.service'
import { CountryEntityService } from './entity/country/country-entity.service'
import { CountryDataService } from './entity/country/country-data.service'
import { SubjectDataService } from './entity/subject/subject-data.service'
import { SubjectEntityService } from './entity/subject/subject-entity.service'
import { RegionEntityService } from './entity/region/region-entity.service'
import { RegionDataService } from './entity/region/region-data.service'
import { GradeDataService } from './entity/grade/grade-data.service'
import { GradeEntityService } from './entity/grade/grade-entity.service'
import { AcademicYearDataService } from './entity/academic-year/academic-year-data.service'
import { AcademicYearEntityService } from './entity/academic-year/academic-year-entity.service'
import { StepStatusEntityService } from './entity/step-status/step-status-entity.service'
import { StepStatusDataService } from './entity/step-status/step-status-data.service'
import { HelpEntityService } from './entity/help/help-entity.service'
import { HelpDataService } from './entity/help/help-data.service'
import { entityMetadata } from './entity/entity-metadata'
import { BlockEntityService } from './entity/block/block-entity.service'
import { BlockDataService } from './entity/block/block-data.service'



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ProjectEntityService,
    ProjectsDataService,
    CountryEntityService,
    CountryDataService,
    SubjectDataService,
    SubjectEntityService,
    RegionEntityService,
    RegionDataService,
    GradeDataService,
    GradeEntityService,
    AcademicYearDataService,
    AcademicYearEntityService,
    StepStatusEntityService,
    StepStatusDataService,
    HelpEntityService,
    HelpDataService,
    BlockEntityService,
    BlockDataService
  ]
})
export class ProjectEditorStoreModule {

  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private projectsDataService: ProjectsDataService,
    private countryDataService: CountryDataService,
    private regionDataService: RegionDataService,
    private subjectDataService: SubjectDataService,
    private gradeDataService: GradeDataService,
    private academicYearDataService: AcademicYearDataService,
    private stepStatusDataService: StepStatusDataService,
    private contextualHelpService: HelpDataService,
    private blockDataService: BlockDataService
  ) {

    eds.registerMetadataMap(entityMetadata)
    entityDataService.registerService('Project', projectsDataService)
    entityDataService.registerService('Country', countryDataService)
    entityDataService.registerService('Subject', subjectDataService)
    entityDataService.registerService('Region', regionDataService)
    entityDataService.registerService('Grade', gradeDataService)
    entityDataService.registerService('AcademicYear', academicYearDataService)
    entityDataService.registerService('StepStatus', stepStatusDataService)
    entityDataService.registerService('ContextualHelp', contextualHelpService)
    entityDataService.registerService('Block', blockDataService)
  }
}
