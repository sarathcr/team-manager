import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectEditorRoutingModule } from './project-editor-routing.module';
// containers
import { StartPointComponent } from './containers/start-point/start-point.component';
// components
import { ProjectThumbnailComponent } from './components/project-thumbnail/project-thumbnail.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { EditorHeaderComponent } from './components/editor-header/editor-header.component';
import { EditorSidebarComponent } from './components/editor-sidebar/editor-sidebar.component';
import { ProjectTitleComponent } from './components/project-title/project-title.component';
import { StepMenuComponent } from './components/step-menu/step-menu.component';
import { TematicaComponent } from './components/tematica/tematica.component';
import { TextareaBulletsComponent } from './components/textarea-bullets/textarea-bullets.component';
import { InfoToolTipComponent } from './components/info-tooltip/info-tooltip.component';
import { GuideQuestionsComponent } from './components/guide-questions/guide-questions.component';
import { FinalProductComponent } from './components/final-product/final-product.component';
import { TextareaComponent } from './components/textarea/textarea.component';
// pages
import { HomeComponent } from './containers/home/home.component';
import { ProjectEditorComponent } from './containers/project-editor/project-editor.component';

// ngx translate
import { TranslateModule } from '@ngx-translate/core';

// NgRx
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { ProjectEntityService } from './services/project/project-entity.service';
import { ProjectsResolver } from './services/project/projects.resolver';
import { ProjectsDataService } from './services/project/projects-data.service';
import { compareProjects } from 'src/app/shared/constants/project.model';
import { CountryEntityService } from './services/country/country-entity.service';
import { CountryDataService } from './services/country/country-data.service';
import { SubjectDataService } from './services/subject/subject-data.service';
import { SubjectEntityService } from './services/subject/subject-entity.service';
import { RegionEntityService } from './services/region/region-entity.service';
import { RegionDataService } from './services/region/region-data.service';
import { GradeDataService } from './services/grade/grade-data.service';
import { AcademicYearDataService } from './services/academic-year/academic-year-data.service';
import { AcademicYearEntityService } from './services/academic-year/academic-year-entity.service';
import { GradeEntityService } from './services/grade/grade-entity.service';
import { StatusComponent } from './components/status/status.component';

const entityMetadata: EntityMetadataMap = {
    Project: {
        sortComparer: compareProjects,
        entityDispatcherOptions: {
            optimisticUpdate: true
        }
    },
    Country: {
      entityDispatcherOptions: {
          optimisticUpdate: true
      }
    },
    Subject: {
      entityDispatcherOptions: {
        optimisticUpdate: true
      }
    },
    Region: {
      entityDispatcherOptions: {
        optimisticUpdate: true
      }
    },
    Grade: {
      entityDispatcherOptions: {
        optimisticUpdate: true
      }
    },
    AcademicYear: {
      entityDispatcherOptions: {
        optimisticUpdate: true
      }
    }
};

@NgModule({
    declarations: [
        HomeComponent,
        ProjectEditorComponent,
        StartPointComponent,
        ProjectThumbnailComponent,
        CreateProjectComponent,
        EditorHeaderComponent,
        EditorSidebarComponent,
        ProjectTitleComponent,
        StepMenuComponent,
        TematicaComponent,
        TextareaBulletsComponent,
        StatusComponent,
        InfoToolTipComponent,
        GuideQuestionsComponent,
        FinalProductComponent,
        TextareaComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ProjectEditorRoutingModule,
        TranslateModule.forChild(),
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        ProjectsResolver,
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
        AcademicYearEntityService
    ]
})

export class ProjectEditorModule {

    constructor(
        private eds: EntityDefinitionService,
        private entityDataService: EntityDataService,
        private projectsDataService: ProjectsDataService,
        private countryDataService: CountryDataService,
        private regionDataService: RegionDataService,
        private subjectDataService: SubjectDataService,
        private gradeDataService: GradeDataService,
        private academicYearDataService: AcademicYearDataService) {

        eds.registerMetadataMap(entityMetadata);
        entityDataService.registerService('Project', projectsDataService);
        entityDataService.registerService('Country', countryDataService);
        entityDataService.registerService('Subject', subjectDataService);
        entityDataService.registerService('Region', regionDataService);
        entityDataService.registerService('Grade', gradeDataService);
        entityDataService.registerService('AcademicYear', academicYearDataService);
    }
}
