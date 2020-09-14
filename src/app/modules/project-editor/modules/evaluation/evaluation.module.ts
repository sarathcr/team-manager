import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { TranslateModule } from '@ngx-translate/core'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { NgScrollbarModule } from 'ngx-scrollbar'
import { SharedModule } from 'src/app/shared/shared.module'
import { ActivityEditorService } from '../activity/services/activity-editor.service'
import { ContextualHelpModule } from '../contextual-help/contextual-help.module'
import { EvaluationEditorComponent } from './containers/evaluation-editor/evaluation-editor.component'
import { EvaluationRoutingModule } from './evaluation-routing.module'
import { EvaluationComponent } from './evaluation.component'

@NgModule({
  declarations: [EvaluationComponent, EvaluationEditorComponent],
  imports: [
    CommonModule,
    EvaluationRoutingModule,
    SharedModule,
    BsDropdownModule.forRoot(),
    TranslateModule.forChild(),
    ContextualHelpModule,
    NgScrollbarModule,
  ],
  providers: [ActivityEditorService],
})
export class EvaluationModule {}
