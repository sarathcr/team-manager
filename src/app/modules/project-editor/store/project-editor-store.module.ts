import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { EntityDataService, EntityDefinitionService } from '@ngrx/data'
import { ProjectEditorToastService } from '../services/project-editor-toast/project-editor-toast.service'
import { AcademicYearDataService } from './entity/academic-year/academic-year-data.service'
import { AcademicYearEntityService } from './entity/academic-year/academic-year-entity.service'
import { BlockContentDataService } from './entity/block-content/block-content-data.service'
import { BlockContentEntityService } from './entity/block-content/block-content-entity.service'
import { BlockDataService } from './entity/block/block-data.service'
import { BlockEntityService } from './entity/block/block-entity.service'
import { CountryDataService } from './entity/country/country-data.service'
import { CountryEntityService } from './entity/country/country-entity.service'
import { CurriculumBasicSkillsDataService } from './entity/curriculum-basic-skills/curriculum-basic-skills-data.service'
import { CurriculumBasicSkillsEntityService } from './entity/curriculum-basic-skills/curriculum-basic-skills-entity.service'
import { CurriculumGradesDataService } from './entity/curriculum-grades/curriculum-grades-data.service'
import { CurriculumGradesEntityService } from './entity/curriculum-grades/curriculum-grades-entity.service'
import { CurriculumDataService } from './entity/curriculum/curriculum-data.service'
import { CurriculumEntityService } from './entity/curriculum/curriculum-entity.service'
import { entityMetadata } from './entity/entity-metadata'
import { EvaluationCriteriaDataService } from './entity/evaluation-criteria/evaluation-criteria-data.service'
import { EvaluationCriteriaEntityService } from './entity/evaluation-criteria/evaluation-criteria-entity.service'
import { ProjectListDataService } from './entity/project-list/project-list-data.service'
import { ProjectListEntityService } from './entity/project-list/project-list-entity.service'
import { ProjectEntityService } from './entity/project/project-entity.service'
import { ProjectsDataService } from './entity/project/projects-data.service'
import { RegionDataService } from './entity/region/region-data.service'
import { RegionEntityService } from './entity/region/region-entity.service'
import { StageDataService } from './entity/stage/stage-data.service'
import { StageEntityService } from './entity/stage/stage-entity.service'
import { StandardDataService } from './entity/standard/standard-data.service'
import { StandardEntityService } from './entity/standard/standard-entity.service'
import { StepStatusDataService } from './entity/step-status/step-status-data.service'
import { StepStatusEntityService } from './entity/step-status/step-status-entity.service'
import { StudentGroupsDataService } from './entity/student-groups/student-groups-data.service'
import { StudentGroupsEntityService } from './entity/student-groups/student-groups-entity.service'
import { TeachingStrategyDataService } from './entity/teaching-strategy/teaching-strategy-data.service'
import { TeachingStrategyEntityService } from './entity/teaching-strategy/teaching-strategy-entity.service'

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    ProjectEntityService,
    ProjectsDataService,
    ProjectListEntityService,
    ProjectListDataService,
    CountryEntityService,
    CountryDataService,
    RegionEntityService,
    RegionDataService,
    AcademicYearDataService,
    AcademicYearEntityService,
    StepStatusEntityService,
    StepStatusDataService,
    BlockEntityService,
    BlockDataService,
    EvaluationCriteriaDataService,
    EvaluationCriteriaEntityService,
    CurriculumBasicSkillsDataService,
    CurriculumBasicSkillsEntityService,
    StandardDataService,
    StandardEntityService,
    StageDataService,
    StageEntityService,
    CurriculumEntityService,
    CurriculumDataService,
    CurriculumGradesDataService,
    CurriculumGradesEntityService,
    StudentGroupsDataService,
    StudentGroupsEntityService,
    TeachingStrategyDataService,
    TeachingStrategyEntityService,
    BlockContentDataService,
    BlockContentEntityService,
  ],
})
export class ProjectEditorStoreModule {
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private projectsDataService: ProjectsDataService,
    private projectListDataService: ProjectListDataService,
    private countryDataService: CountryDataService,
    private regionDataService: RegionDataService,
    private academicYearDataService: AcademicYearDataService,
    private stepStatusDataService: StepStatusDataService,
    private blockDataService: BlockDataService,
    private evaluatioCriteriaDataService: EvaluationCriteriaDataService,
    private basicSkillsDataService: CurriculumBasicSkillsDataService,
    private standardDataService: StandardDataService,
    private stageService: StageDataService,
    private curriculumDataService: CurriculumDataService,
    private curriculumGradesDataService: CurriculumGradesDataService,
    private studentGroupsDataService: StudentGroupsDataService,
    private teachingStrategyDataService: TeachingStrategyDataService,
    private blockContentDataService: BlockContentDataService,
    projectEditorToastService: ProjectEditorToastService
  ) {
    eds.registerMetadataMap(entityMetadata)
    entityDataService.registerServices({
      Project: projectsDataService,
      ProjectList: projectListDataService,
      Country: countryDataService,
      Region: regionDataService,
      AcademicYear: academicYearDataService,
      StepStatus: stepStatusDataService,
      Block: blockDataService,
      EvaluationCriteria: evaluatioCriteriaDataService,
      CurriculumBasicSkills: basicSkillsDataService,
      Standard: standardDataService,
      Stage: stageService,
      Curriculum: curriculumDataService,
      CurriculumGrades: curriculumGradesDataService,
      StudentGroups: studentGroupsDataService,
      TeachingStrategy: teachingStrategyDataService,
      BlockContent: blockContentDataService,
    })
  }
}
