import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ProfileInfoComponent } from './containers/profile-info/profile-info.component'
import { ProfilePreferencesComponent } from './containers/profile-preferences/profile-preferences.component'
import { ProfileSetupComponent } from './containers/profile-setup/profile-setup.component'
import { ProfileComponent } from './profile.component'

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        redirectTo: 'details',
      },
      {
        path: 'details',
        component: ProfileInfoComponent,
      },
      {
        path: 'preferences',
        component: ProfilePreferencesComponent,
      },
      {
        path: 'setup',
        component: ProfileSetupComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
