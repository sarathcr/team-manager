import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { PeopleEditorComponent } from './containers/people-editor/people-editor.component'
import { PeopleComponent } from './people.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PeopleComponent,
    children: [
      {
        path: '',
        component: PeopleEditorComponent,
      },
      {
        path: ':id',
        component: PeopleEditorComponent,
      },
      { path: '**', redirectTo: './not-found' },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeopleRoutingModule {}
