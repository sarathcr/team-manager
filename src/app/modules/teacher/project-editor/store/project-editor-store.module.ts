import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { EntityDataService, EntityDefinitionService } from '@ngrx/data'
import { ProjectEditorToastService } from '../services/project-editor-toast/project-editor-toast.service'
import { AcademicYearDataService } from './entity/academic-year/academic-year-data.service'
import { AcademicYearEntityService } from './entity/academic-year/academic-year-entity.service'
import { ActivityPreviewDataService } from './entity/activity-preview/activity-preview-data.service'
import { ActivityPreviewEntityService } from './entity/activity-preview/activity-preview-entity.service'
import { BlockContentDataService } from './entity/block-content/block-content-data.service'
import { BlockContentEntityService } from './entity/block-content/block-content-entity.service'
import { BlockDataService } from './entity/block/block-data.service'
import { BlockEntityService } from './entity/block/block-entity.service'
import { CardListDataService } from './entity/card-list/card-list-data.service'
import { CardListEntityService } from './entity/card-list/card-list-entity.service'
import { CollaboratorListDataService } from './entity/collaborator-list/collaborator-list-data.service'
import { CollaboratorListEntityService } from './entity/collaborator-list/collaborator-list-entity.service'
import { CountryDataService } from './entity/country/country-data.service'
import { CountryEntityService } from './entity/country/country-entity.service'
import { CurriculumBasicSkillsDataService } from './entity/curriculum-basic-skills/curriculum-basic-skills-data.service'
import { CurriculumBasicSkillsEntityService } from './entity/curriculum-basic-skills/curriculum-basic-skills-entity.service'
import { CurriculumGradesDataService } from './entity/curriculum-grades/curriculum-grades-data.service'
import { CurriculumGradesEntityService } from './entity/curriculum-grades/curriculum-grades-entity.service'
import { CurriculumDataService } from './entity/curriculum/curriculum-data.service'
import { CurriculumEntityService } from './entity/curriculum/curriculum-entity.service'
import { DriveFileDataService } from './entity/drive-file/drive-file-data.service'
import { DriveFileEntityService } from './entity/drive-file/drive-file-entity.service'
import { entityMetadata } from './entity/entity-metadata'
import { EvaluationCriteriaDataService } from './entity/evaluation-criteria/evaluation-criteria-data.service'
import { EvaluationCriteriaEntityService } from './entity/evaluation-criteria/evaluation-criteria-entity.service'
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
import { SubjectDataService } from './entity/subjects/subject-data.service'
import { SubjectEntityService } from './entity/subjects/subject-entity.service'
import { TeachingStrategyDataService } from './entity/teaching-strategy/teaching-strategy-data.service'
import { TeachingStrategyEntityService } from './entity/teaching-strategy/teaching-strategy-entity.service'

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    ProjectEntityService,
    ProjectsDataService,
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
    DriveFileDataService,
    DriveFileEntityService,
    BlockContentDataService,
    BlockContentEntityService,
    SubjectEntityService,
    SubjectDataService,
    ActivityPreviewEntityService,
    ActivityPreviewDataService,
    CollaboratorListEntityService,
    CollaboratorListDataService,
    CardListDataService,
    CardListEntityService,
  ],
})
export class ProjectEditorStoreModule {
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private projectsDataService: ProjectsDataService,
    private countryDataService: CountryDataService,
    private regionDataService: RegionDataService,
    private academicYearDataService: AcademicYearDataService,
    private subjectDataService: SubjectDataService,
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
    private driveFileService: DriveFileDataService,
    private blockContentDataService: BlockContentDataService,
    private activityPreviewDataService: ActivityPreviewDataService,
    private collaboratorListDataService: CollaboratorListDataService,
    private cardListDataService: CardListDataService,
    projectEditorToastService: ProjectEditorToastService
  ) {
    eds.registerMetadataMap(entityMetadata)
    entityDataService.registerServices({
      Project: projectsDataService,
      Country: countryDataService,
      Region: regionDataService,
      AcademicYear: academicYearDataService,
      Subject: subjectDataService,
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
      DriveFile: driveFileService,
      BlockContent: blockContentDataService,
      ActivityPreview: activityPreviewDataService,
      CollaboratorList: collaboratorListDataService,
      CardList: cardListDataService,
    })
  }
}
