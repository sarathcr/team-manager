import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { TranslateModule } from '@ngx-translate/core'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { NgScrollbarModule } from 'ngx-scrollbar'
import { CommonSharedModule } from 'src/app/common-shared/common-shared.module'
import { SharedModule } from 'src/app/modules/shared/shared.module'
import { ProfileModule } from '../../../profile/profile.module'
import { ContextualHelpModule } from '../contextual-help/contextual-help.module'
import { StickyFooterComponent } from './components/sticky-footer/sticky-footer.component'
import { PeopleEditorComponent } from './containers/people-editor/people-editor.component'
import { PeopleComponent } from './people.component'
import { PeopleRoutingModule } from './people.routing.module'
@NgModule({
  declarations: [PeopleComponent, PeopleEditorComponent, StickyFooterComponent],
  imports: [
    CommonModule,
    CommonSharedModule,
    SharedModule,
    PeopleRoutingModule,
    BsDropdownModule.forRoot(),
    TranslateModule,
    ContextualHelpModule,
    NgScrollbarModule,
    ProfileModule,
  ],
  providers: [PeopleEditorComponent],
})
export class PeopleModule {}
