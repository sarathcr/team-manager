import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

import { TranslateModule } from '@ngx-translate/core'

import { SharedModule } from 'src/app/shared/shared.module'
import { ProfileRoutingModule } from './profile-routing.module'

import { EducationCenterFormComponent } from './containers/education-center-form/education-center-form.component'
import { ProfileInfoComponent } from './containers/profile-info/profile-info.component'
import { ProfileSetupComponent } from './containers/profile-setup/profile-setup.component'
import { UserDetailsFormComponent } from './containers/user-details-form/user-details-form.component'
import { WorkplaceFormComponent } from './containers/workplace-form/workplace-form.component'

import { CuriousSidebarComponent } from './components/curious-sidebar/curious-sidebar.component'
import { ProfileComponent } from './profile.component'

import { NgScrollbarModule } from 'ngx-scrollbar'
import { ProfileRowComponent } from './components/profile-row/profile-row.component'
import { ProfileConfirmComponent } from './containers/profile-confirm/profile-confirm.component'
import { ProfilePreferencesComponent } from './containers/profile-preferences/profile-preferences.component'

@NgModule({
  declarations: [
    ProfileComponent,
    CuriousSidebarComponent,
    ProfileInfoComponent,
    EducationCenterFormComponent,
    UserDetailsFormComponent,
    WorkplaceFormComponent,
    ProfileSetupComponent,
    ProfileRowComponent,
    ProfilePreferencesComponent,
    ProfileConfirmComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule,
    NgScrollbarModule,
  ],
})
export class ProfileModule {}
