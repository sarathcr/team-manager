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
import { EvaluationCriteriaDataService } from './entity/evaluation-criteria/evaluation-criteria-data.service'
import { EvaluationCriteriaEntityService } from './entity/evaluation-criteria/evaluation-criteria-entity.service'
import { CurriculumBasicSkillsDataService } from './entity/curriculum-basic-skills/curriculum-basic-skills-data.service'
import { CurriculumBasicSkillsEntityService } from './entity/curriculum-basic-skills/curriculum-basic-skills-entity.service'



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
    BlockDataService,
    EvaluationCriteriaDataService,
    EvaluationCriteriaEntityService,
    CurriculumBasicSkillsDataService,
    CurriculumBasicSkillsEntityService
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
    private blockDataService: BlockDataService,
    private evaluatioCriteriaDataService: EvaluationCriteriaDataService,
    private basicSkillsDataService: CurriculumBasicSkillsDataService
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
    entityDataService.registerService('EvaluationCriteria', evaluatioCriteriaDataService)
    entityDataService.registerService('CurriculumBasicSkills', basicSkillsDataService)
  }
}
