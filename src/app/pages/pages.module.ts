import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { HomeComponent } from './home/home.component';
import { ProjectEditorComponent } from './project-editor/project-editor.component';
import { SharedModule } from '../shared/shared.module';
import { ModulesModule } from '../modules/modules.module';


@NgModule({
  declarations: [
    HomeComponent,
    ProjectEditorComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    ModulesModule
  ],
  exports: [
    HomeComponent,
    ProjectEditorComponent
  ],
  providers: [

  ],
})
export class PagesModule { }
