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
import { ProjectInputTitleComponent } from './components/project-input-title/project-input-title.component';
// pages
import { HomeComponent } from './pages/home/home.component';
import { ProjectEditorComponent } from './pages/project-editor/project-editor.component';
// services
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { ProjectsHttpService } from './services/projects-http.service';
// NgRx
import { StoreModule } from '@ngrx/store';
import { projectsReducer } from './state/project.reducers';
import { ProjectsResolver } from './state/projects.resolver';
import { EffectsModule } from '@ngrx/effects';
import { ProjectsEffects } from './state/projects.effects'
 
@NgModule({
    declarations: [
        AddProjectComponent,
        ListProjectComponent,
        ProjectEditorHeaderComponent,
        ProjectEditorSidebarComponent,
        ProjectInputTitleComponent,
        HomeComponent,
        ProjectEditorComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ProjectEditorRoutingModule,
        StoreModule.forFeature('projects', projectsReducer),
        EffectsModule.forFeature([ProjectsEffects]),
    ],
    providers: [
        LocalStorageService,
        ProjectsHttpService,
        ProjectsResolver
    ]
})

export class ProjectEditorModule { }
