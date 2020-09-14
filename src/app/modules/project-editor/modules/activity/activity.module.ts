import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { PdfViewerModule } from 'ng2-pdf-viewer'
import { NgScrollbarModule } from 'ngx-scrollbar'
import { SharedModule } from 'src/app/shared/shared.module'
import { ContextualHelpModule } from '../contextual-help/contextual-help.module'
import { ActivityRoutingModule } from './activity-routing.module'
import { ActivityComponent } from './activity.component'
import { ActivityEditorFooterComponent } from './components/activity-editor-footer/activity-editor-footer.component'
import { ActivityEditorHeaderComponent } from './components/activity-editor-header/activity-editor-header.component'
import { AddExerciseComponent } from './components/add-exercise/add-exercise.component'
import { AddMaterialComponent } from './components/add-material/add-material.component'
import { DraggableRowComponent } from './components/draggable-row/draggable-row.component'
import { PickerComponent } from './components/picker/picker.component'
import { StatisticsBoxComponent } from './components/statistics-box/statistics-box.component'
import { ActivityEditorComponent } from './containers/activity-editor/activity-editor.component'
import { CreationComponent } from './containers/creation/creation.component'
import { DashboardComponent } from './containers/dashboard/dashboard.component'
import { DefinitionComponent } from './containers/definition/definition.component'
import { MinutesToHours } from './pipes/minutes-to-hours.pipe'
import { ActivityEditorService } from './services/activity-editor.service'
import { CreationService } from './services/creation/creation.service'
import { DashboardService } from './services/dashboard.service/dashboard.service'
import { PickerService } from './services/picker.service/picker.service'

@NgModule({
  declarations: [
    ActivityComponent,
    DashboardComponent,
    StatisticsBoxComponent,
    DraggableRowComponent,
    MinutesToHours,
    ActivityEditorComponent,
    DefinitionComponent,
    ActivityEditorHeaderComponent,
    ActivityEditorFooterComponent,
    AddMaterialComponent,
    CreationComponent,
    PickerComponent,
    AddExerciseComponent,
  ],
  imports: [
    CommonModule,
    ActivityRoutingModule,
    SharedModule,
    TranslateModule.forChild(),
    ContextualHelpModule,
    NgScrollbarModule,
    PdfViewerModule,
  ],
  providers: [
    ActivityEditorService,
    DashboardService,
    CreationService,
    PickerService,
  ],
})
export class ActivityModule {}
