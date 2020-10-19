import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { TranslateModule } from '@ngx-translate/core'

import { CommonSharedModule } from 'src/app/common-shared/common-shared.module'
import { SharedModule } from 'src/app/modules/shared/shared.module'

import { ProfilePreferencesComponent } from './containers/profile-preferences/profile-preferences.component'

import { ProfileComponent } from './profile.component'

import { NgScrollbarModule } from 'ngx-scrollbar'
import { ProfileInfoComponent } from './containers/profile-info/profile-info.component'
import { ProfileRoutingModule } from './profile-routing.module'

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileInfoComponent,
    ProfilePreferencesComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    CommonSharedModule,
    SharedModule,
    TranslateModule,
    NgScrollbarModule,
  ],
})
export class ProfileModule {}
