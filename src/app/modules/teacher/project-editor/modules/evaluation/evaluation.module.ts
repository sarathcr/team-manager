import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { TranslateModule } from '@ngx-translate/core'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { TooltipModule } from 'ngx-bootstrap/tooltip'
import { NgScrollbarModule } from 'ngx-scrollbar'

import { CarouselModule } from 'ngx-bootstrap/carousel'
import { CommonSharedModule } from '../../../../../common-shared/common-shared.module'
import { ActivityEditorService } from '../activity/services/activity-editor.service'
import { ContextualHelpModule } from '../contextual-help/contextual-help.module'
import { EvaluationCardComponent } from './components/evaluation-card/evaluation-card.component'
import { EvaluationSidebarComponent } from './components/evaluation-sidebar/evaluation-sidebar.component'
import { EvaluationEditorComponent } from './containers/evaluation-editor/evaluation-editor.component'
import { EvaluationRoutingModule } from './evaluation-routing.module'
import { EvaluationComponent } from './evaluation.component'

@NgModule({
  declarations: [
    EvaluationCardComponent,
    EvaluationComponent,
    EvaluationEditorComponent,
    EvaluationSidebarComponent,
  ],
  imports: [
    CommonModule,
    EvaluationRoutingModule,
    CommonSharedModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    TranslateModule.forChild(),
    CarouselModule.forRoot(),
    ContextualHelpModule,
    NgScrollbarModule,
  ],
  providers: [ActivityEditorService],
})
export class EvaluationModule {}
