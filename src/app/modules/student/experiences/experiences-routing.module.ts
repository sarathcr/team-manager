import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ExperienceComponent } from './containers/experience/experience.component'
import { HomeComponent } from './containers/home/home.component'
import { ExperiencesComponent } from './experiences.component'

const routes: Routes = [
  {
    path: '',
    component: ExperiencesComponent,
    children: [{ path: '', component: HomeComponent }],
  },
  {
    path: ':id',
    component: ExperienceComponent,
  },
  { path: '**', redirectTo: './not-found' },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExperiencesRoutingModule {}
