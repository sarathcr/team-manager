import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ProjectOutputComponent } from './project-output.component'
import { OutputViewComponent } from './containers/output-view/output-view.component'

const routes: Routes = [
  {
    path: '',
    component: ProjectOutputComponent,
    children: [
      {
        path: 'project/:id',
        component: OutputViewComponent
      }
    ]
  },
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectOutputRoutingModule { }
