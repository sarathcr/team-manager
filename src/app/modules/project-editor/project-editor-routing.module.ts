import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjectEditorComponent } from './pages/project-editor/project-editor.component';
import { ProjectsResolver } from './services/project/projects.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      projects: ProjectsResolver
    }
  },
  {
    path: ':id',
    component: ProjectEditorComponent,
    resolve: {
      projects: ProjectsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectEditorRoutingModule { }
