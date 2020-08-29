import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ActivityComponent } from './activity.component'
import { ActivityEditorComponent } from './containers/activity-editor/activity-editor.component'
import { DashboardComponent } from './containers/dashboard/dashboard.component'

const routes: Routes = [
  {
    path: '',
    component: ActivityComponent,
    children: [
      { path: '', component: DashboardComponent },
      {
        path: ':id',
        component: ActivityEditorComponent,
        children: [
          {
            path: ':page',
            component: ActivityEditorComponent,
          },
          { path: '', redirectTo: 'definition' },
        ],
      },
    ],
  },
  { path: '**', redirectTo: './not-found' },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivityRoutingModule {}
