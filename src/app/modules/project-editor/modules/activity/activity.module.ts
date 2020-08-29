import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { NgScrollbarModule } from 'ngx-scrollbar'
import { SharedModule } from 'src/app/shared/shared.module'
import { ContextualHelpModule } from '../contextual-help/contextual-help.module'
import { ActivityRoutingModule } from './activity-routing.module'
import { ActivityComponent } from './activity.component'
import { ActivityEditorFooterComponent } from './components/activity-editor-footer/activity-editor-footer.component'
import { ActivityEditorHeaderComponent } from './components/activity-editor-header/activity-editor-header.component'
import { AddMaterialComponent } from './components/add-material/add-material.component'
import { DraggableRowComponent } from './components/draggable-row/draggable-row.component'
import { StatisticsBoxComponent } from './components/statistics-box/statistics-box.component'
import { ActivityEditorComponent } from './containers/activity-editor/activity-editor.component'
import { CreationComponent } from './containers/creation/creation.component'
import { DashboardComponent } from './containers/dashboard/dashboard.component'
import { DefinitionComponent } from './containers/definition/definition.component'
import { MinutesToHours } from './pipes/minutes-to-hours.pipe'
import { ActivityEditorService } from './services/activity-editor.service'
import { CreationService } from './services/creation/creation.service'
import { DashboardService } from './services/dashboard.service/dashboard.service'

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
  ],
  imports: [
    CommonModule,
    ActivityRoutingModule,
    SharedModule,
    BsDropdownModule.forRoot(),
    TranslateModule.forChild(),
    ContextualHelpModule,
    NgScrollbarModule,
  ],
  providers: [ActivityEditorService, DashboardService, CreationService],
})
export class ActivityModule {}
