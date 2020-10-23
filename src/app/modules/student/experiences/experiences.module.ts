import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { CommonSharedModule } from 'src/app/common-shared/common-shared.module'
import { SharedModule } from '../../shared/shared.module'
import { BannerComponent } from './components/banner/banner.component'
import { ExperienceComponent } from './containers/experience/experience.component'
import { HomeComponent } from './containers/home/home.component'
import { ExperiencesRoutingModule } from './experiences-routing.module'
import { ExperiencesComponent } from './experiences.component'
import { ExperiencesStoreModule } from './store/experiences-store.module'

@NgModule({
  declarations: [
    ExperiencesComponent,
    HomeComponent,
    ExperienceComponent,
    BannerComponent,
  ],
  imports: [
    CommonModule,
    CommonSharedModule,
    SharedModule,
    ExperiencesRoutingModule,
    ExperiencesStoreModule,
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ExperiencesModule {}
