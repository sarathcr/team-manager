import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
// Libraries
import { PdfViewerModule } from 'ng2-pdf-viewer'
import { NgScrollbarModule } from 'ngx-scrollbar'
// Modules
import { SharedModule } from 'src/app/shared/shared.module'
import { ProjectOutputRoutingModule } from './project-output-routing.module'
import { TranslateModule } from '@ngx-translate/core'
// Containers
import { OutputViewComponent } from './containers/output-view/output-view.component'
// Components
import { ProjectOutputComponent } from './project-output.component'
import { HeaderComponent } from './components/header/header.component'
import { SidebarComponent } from './components/sidebar/sidebar.component'
// Services
import { ProjectEditorStoreModule } from './../../store/project-editor-store.module'

@NgModule({
  declarations: [
    ProjectOutputComponent,
    OutputViewComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProjectOutputRoutingModule,
    PdfViewerModule,
    NgScrollbarModule,
    TranslateModule.forChild(),
    ProjectEditorStoreModule
  ]
})
export class ProjectOuputModule { }
