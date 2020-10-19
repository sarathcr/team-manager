import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { AccordionModule } from 'ngx-bootstrap/accordion'
import { BsModalRef } from 'ngx-bootstrap/modal'
import { TabsModule } from 'ngx-bootstrap/tabs'
import { CommonSharedModule } from 'src/app/common-shared/common-shared.module'
import { StringDecoder } from '../../pipes/string-decoder.pipe'
import { ContextualHelpComponent } from './components/contextual-help/contextual-help.component'
import { HelpAccordionComponent } from './components/help-accordion/help-accordion.component'
import { HelpImgThumbComponent } from './components/help-img-thumb/help-img-thumb.component'
import { HelpLinkComponent } from './components/help-link/help-link.component'
import { HelpModalContentComponent } from './components/help-modal-content/help-modal-content.component'
import { HelpVideoThumbComponent } from './components/help-video-thumb/help-video-thumb.component'
import { VideoPlayerComponent } from './components/video-player/video-player.component'
import { ContextualHelpStoreModule } from './store/contextual-help-store.module'

@NgModule({
  declarations: [
    HelpAccordionComponent,
    HelpModalContentComponent,
    HelpLinkComponent,
    HelpVideoThumbComponent,
    VideoPlayerComponent,
    HelpImgThumbComponent,
    StringDecoder,
    ContextualHelpComponent,
  ],
  imports: [
    CommonModule,
    TabsModule.forRoot(),
    AccordionModule.forRoot(),
    ContextualHelpStoreModule,
    TranslateModule.forChild(),
    CommonSharedModule,
  ],
  exports: [
    HelpAccordionComponent,
    HelpModalContentComponent,
    HelpLinkComponent,
    HelpVideoThumbComponent,
    VideoPlayerComponent,
    HelpImgThumbComponent,
    StringDecoder,
    ContextualHelpComponent,
  ],
  providers: [BsModalRef],
})
export class ContextualHelpModule {}
