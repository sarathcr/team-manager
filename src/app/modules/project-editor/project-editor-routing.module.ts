import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { EditorComponent } from './containers/editor/editor.component';
import { ProjectEditorComponent } from './project-editor.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectEditorComponent,
    children: [
      {
        path: 'projects',
        component: HomeComponent
      },
      {
        path: 'project/:id',
        component: EditorComponent
      },
      { path: '**', redirectTo: 'projects' }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectEditorRoutingModule { }
