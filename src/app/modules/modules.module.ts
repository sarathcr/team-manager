import { ListProjectComponent } from './creator-home/list-project/list-project.component';
import { AddProjectComponent } from './creator-home/add-project/add-project.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CreatorHomeModule } from './creator-home/creator-home.module';
import { ProjectEditorHeaderComponent } from './creator-projectEditor/project-editor-header/project-editor-header.component';
import { ProjectEditorSidebarComponent } from './creator-projectEditor/project-editor-sidebar/project-editor-sidebar.component';

@NgModule({
    declarations: [
        AddProjectComponent,
        ListProjectComponent,
        ProjectEditorHeaderComponent,
        ProjectEditorSidebarComponent
    ],
    imports: [
        CommonModule,
        // CreatorHomeModule,
    ],
    exports: [
        AddProjectComponent,
        ListProjectComponent,
        ProjectEditorHeaderComponent,
        ProjectEditorSidebarComponent
    ]
})

export class ModulesModule{}
