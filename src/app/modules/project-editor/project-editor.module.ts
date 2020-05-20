import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectEditorRoutingModule } from './project-editor-routing.module';
// containers
import { StartPointComponent } from './containers/start-point/start-point.component';
// components
import { ListProjectComponent } from './components/list-project/list-project.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { ProjectEditorHeaderComponent } from './components/project-editor-header/project-editor-header.component';
import { ProjectEditorSidebarComponent } from './components/project-editor-sidebar/project-editor-sidebar.component';
import { ProjectTitleComponent } from './components/project-title/project-title.component';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
// pages
import { HomeComponent } from './pages/home/home.component';
import { ProjectEditorComponent } from './pages/project-editor/project-editor.component';
// NgRx
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { ProjectEntityService } from './services/project/project-entity.service';
import { ProjectsResolver } from './services/project/projects.resolver';
import { ProjectsDataService } from './services/project/projects-data.service';
import { compareProjects } from 'src/app/shared/models/project.model';
import { NewProjectResService } from './services/project/new-project-res.service';
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
        ListProjectComponent,
        AddProjectComponent,
        ProjectEditorHeaderComponent,
        ProjectEditorSidebarComponent,
        ProjectTitleComponent,
        LeftMenuComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ProjectEditorRoutingModule,
    ],
    providers: [
        ProjectsResolver,
        ProjectEntityService,
        ProjectsDataService,
        NewProjectResService,
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
