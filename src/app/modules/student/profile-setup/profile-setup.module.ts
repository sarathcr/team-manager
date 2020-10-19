import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { TranslateModule } from '@ngx-translate/core'
import { NgScrollbarModule } from 'ngx-scrollbar'

import { CommonSharedModule } from 'src/app/common-shared/common-shared.module'
import { SharedModule } from 'src/app/modules/shared/shared.module'
import { ProfileSetupRoutingModule } from './profile-setup-routing.module'

import { EducationCenterFormComponent } from './containers/education-center-form/education-center-form.component'
import { ProfileConfirmComponent } from './containers/profile-confirm/profile-confirm.component'
import { UserDetailsFormComponent } from './containers/user-details-form/user-details-form.component'
import { WorkplaceFormComponent } from './containers/workplace-form/workplace-form.component'

import { CuriousSidebarComponent } from './components/curious-sidebar/curious-sidebar.component'
import { ProfileSetupComponent } from './profile-setup.component'

@NgModule({
  declarations: [
    CuriousSidebarComponent,
    EducationCenterFormComponent,
    ProfileConfirmComponent,
    ProfileSetupComponent,
    UserDetailsFormComponent,
    WorkplaceFormComponent,
  ],
  imports: [
    CommonModule,
    CommonSharedModule,
    SharedModule,
    TranslateModule,
    NgScrollbarModule,
    ProfileSetupRoutingModule,
  ],
})
export class ProfileSetupModule {}
