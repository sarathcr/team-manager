import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
// Modules
import { SharedModule } from 'src/app/shared/shared.module';
// components
import { ListProjectComponent } from './components/list-project/list-project.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { ProjectEditorHeaderComponent } from './components/project-editor-header/project-editor-header.component';
import { ProjectEditorSidebarComponent } from './components/project-editor-sidebar/project-editor-sidebar.component';
import { ProjectTitleComponent } from './components/project-title/project-title.component';
// pages
import { HomeComponent } from './pages/home/home.component';
import { ProjectEditorComponent } from './pages/project-editor/project-editor.component';
import { ProjectEditorRoutingModule } from './project-editor-routing.module';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
 
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
        ProjectEditorRoutingModule
    ],
    providers: [
        LocalStorageService
    ]
})

export class ProjectEditorModule { }
