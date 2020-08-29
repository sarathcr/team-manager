import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { OutputViewComponent } from './containers/output-view/output-view.component'
import { ProjectOutputComponent } from './project-output.component'

const routes: Routes = [
  {
    path: '',
    component: ProjectOutputComponent,
    children: [
      {
        path: 'project/:id',
        component: OutputViewComponent,
      },
    ],
  },
  { path: '**', redirectTo: '' },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectOutputRoutingModule {}
