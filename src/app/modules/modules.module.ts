import { ListProjectComponent } from './creator-home/list-project/list-project.component';
import { AddProjectComponent } from './creator-home/add-project/add-project.component';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ProjectEditorHeaderComponent } from './creator-projectEditor/project-editor-header/project-editor-header.component';
import { ProjectEditorSidebarComponent } from './creator-projectEditor/project-editor-sidebar/project-editor-sidebar.component';
import { ProjectInputTitleComponent } from './creator-projectEditor/project-input-title/project-input-title.component';

@NgModule({
    declarations: [
        AddProjectComponent,
        ListProjectComponent,
        ProjectEditorHeaderComponent,
        ProjectEditorSidebarComponent,
        ProjectInputTitleComponent
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        AddProjectComponent,
        ListProjectComponent,
        ProjectEditorHeaderComponent,
        ProjectEditorSidebarComponent
    ]
})

export class ModulesModule { }
