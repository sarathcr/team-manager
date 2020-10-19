import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
// Libraries
import { PdfViewerModule } from 'ng2-pdf-viewer'
import { NgScrollbarModule } from 'ngx-scrollbar'
// Modules
import { CommonSharedModule } from 'src/app/common-shared/common-shared.module'
// Services
import { ProjectOutputService } from './services/output/project-output.service'

// Containers
import { OutputViewComponent } from './containers/output-view/output-view.component'
import { ProjectOutputRoutingModule } from './project-output-routing.module'
// Components
import { ProjectOutputComponent } from './project-output.component'

import { HeaderComponent } from './components/header/header.component'
import { SidebarComponent } from './components/sidebar/sidebar.component'
@NgModule({
  declarations: [
    ProjectOutputComponent,
    OutputViewComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    CommonSharedModule,
    ProjectOutputRoutingModule,
    PdfViewerModule,
    NgScrollbarModule,
    TranslateModule.forChild(),
  ],
  providers: [ProjectOutputService],
})
export class ProjectOuputModule {}
