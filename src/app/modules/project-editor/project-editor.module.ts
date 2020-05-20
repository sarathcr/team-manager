import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectEditorRoutingModule } from './project-editor-routing.module';
// containers
import { StartPointComponent } from './containers/start-point/start-point.component';
// components
import { ProjectThumbnailComponent } from './components/project-thumbnail/project-thumbnail.component';
import { CreateButtonComponent } from './components/create-button/create-button.component';
import { EditorHeaderComponent } from './components/editor-header/editor-header.component';
import { EditorSidebarComponent } from './components/editor-sidebar/editor-sidebar.component';
import { ProjectTitleComponent } from './components/project-title/project-title.component';
import { StepMenuComponent } from './components/step-menu/step-menu.component';
// pages
import { HomeComponent } from './pages/home/home.component';
import { ProjectEditorComponent } from './pages/project-editor/project-editor.component';
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
        HomeComponent,
        ProjectEditorComponent,
        StartPointComponent,
        ProjectThumbnailComponent,
        CreateButtonComponent,
        EditorHeaderComponent,
        EditorSidebarComponent,
        ProjectTitleComponent,
        StepMenuComponent
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
