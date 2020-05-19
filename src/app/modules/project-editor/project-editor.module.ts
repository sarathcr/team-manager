import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectEditorRoutingModule } from './project-editor-routing.module';
// components
import { ListProjectComponent } from './components/list-project/list-project.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { ProjectEditorHeaderComponent } from './components/project-editor-header/project-editor-header.component';
import { ProjectEditorSidebarComponent } from './components/project-editor-sidebar/project-editor-sidebar.component';
import { ProjectTitleComponent } from './components/project-title/project-title.component';
// pages
import { HomeComponent } from './pages/home/home.component';
import { ProjectEditorComponent } from './pages/project-editor/project-editor.component';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
// NgRx
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { ProjectEntityService } from './services/project-entity.service';
import { ProjectsResolver } from './services/projects.resolver';
import { ProjectsDataService } from './services/projects-data.service';
import { compareProjects } from 'src/app/shared/models/project.model';
import { NewProjectResService } from './services/new-project-res.service';

const entityMetadata: EntityMetadataMap = {
    Project: {
        sortComparer: compareProjects,
        entityDispatcherOptions: {
            optimisticUpdate: true
        }
    }
};

@NgModule({
    declarations: [
        AddProjectComponent,
        ListProjectComponent,
        ProjectEditorHeaderComponent,
        ProjectEditorSidebarComponent,
        ProjectTitleComponent,
        HomeComponent,
        ProjectEditorComponent,
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
        NewProjectResService
    ]
})

export class ProjectEditorModule {

    constructor(
        private eds: EntityDefinitionService,
        private entityDataService: EntityDataService,
        private projectsDataService: ProjectsDataService) {

        eds.registerMetadataMap(entityMetadata);
        entityDataService.registerService('Project', projectsDataService);
    }

}
