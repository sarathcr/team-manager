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

// ngx translate
import { TranslateModule } from '@ngx-translate/core';
 
// NgRx
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { ProjectEntityService } from './services/project-services/project-entity.service';
import { ProjectsResolver } from './services/project-services/projects.resolver';
import { ProjectsDataService } from './services/project-services/projects-data.service';
import { compareProjects } from 'src/app/shared/constants/project.model';
import { NewProjectResService } from './services/project-services/new-project-res.service';
import { CountryEntityService } from './services/country-services/country-entity.service';
import { CountryDataService } from './services/country-services/country-data.service';

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
        TranslateModule.forChild()
    ],
    providers: [
        ProjectsResolver,
        ProjectEntityService,
        ProjectsDataService,
        NewProjectResService,
        CountryEntityService,
        CountryDataService
    ]
})

export class ProjectEditorModule {

    constructor(
        private eds: EntityDefinitionService,
        private entityDataService: EntityDataService,
        private projectsDataService: ProjectsDataService,
        private countryDataService: CountryDataService) {

        eds.registerMetadataMap(entityMetadata);
        entityDataService.registerService('Project', projectsDataService);
        entityDataService.registerService('Country', countryDataService);
    }
}
