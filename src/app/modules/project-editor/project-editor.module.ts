import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
// lib's
import { setTheme } from 'ngx-bootstrap/utils'
import { TabsModule } from 'ngx-bootstrap/tabs'
import { AccordionModule } from 'ngx-bootstrap/accordion'
import { TranslateModule } from '@ngx-translate/core'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { PdfViewerModule } from 'ng2-pdf-viewer'
import { NgScrollbarModule } from 'ngx-scrollbar'
import { AlertModule } from 'ngx-bootstrap/alert'
// Modules
import { SharedModule } from 'src/app/shared/shared.module'
import { ProjectEditorRoutingModule } from './project-editor-routing.module'
import { ProjectEditorStoreModule } from './store/project-editor-store.module'
// containers
import { StepOneComponent } from './containers/step-one/step-one.component'
import { ContextualHelpComponent } from './containers/contextual-help/contextual-help.component'
import { StepTwoComponent } from './containers/step-two/step-two.component'
import { StepSevenComponent } from './containers/step-seven/step-seven.component'
import { StepEightComponent } from './containers/step-eight/step-eight.component'
import { StepThreeComponent } from './containers/step-three/step-three.component'
import { StepFourComponent } from './containers/step-four/step-four.component'
import { StepFiveComponent } from './containers/step-five/step-five.component'
import { StepSixComponent } from './containers/step-six/step-six.component'
import { StepNineComponent } from './containers/step-nine/step-nine.component'
import { StepTenComponent } from './containers/step-ten/step-ten.component'
import { HomeComponent } from './containers/home/home.component'
import { EditorComponent } from './containers/editor/editor.component'
// components
import { ProjectEditorComponent } from './project-editor.component'
import { ProjectThumbnailComponent } from './components/project-thumbnail/project-thumbnail.component'
import { CreateProjectComponent } from './components/create-project/create-project.component'
import { HeaderComponent } from './components/header/header.component'
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { StepMenuComponent } from './components/step-menu/step-menu.component'
import { HelpAccordionComponent } from './components/help-accordion/help-accordion.component'
import { HelpModalContentComponent } from './components/help-modal-content/help-modal-content.component'
import { HelpLinkComponent } from './components/help-link/help-link.component'
import { HelpVideoThumbComponent } from './components/help-video-thumb/help-video-thumb.component'
import { ImageUploadComponent } from './components/image-upload/image-upload.component'
import { HelpImgThumbComponent } from './components/help-img-thumb/help-img-thumb.component'
import { PrincipalViewComponent } from './components/principal-view/principal-view.component'
import { ModalStandardsComponent } from './components/modal-standards/modal-standards.component'
import { StepUnlockComponent } from './components/step-unlock/step-unlock.component'
import { DetailsSelectorComponent } from './components/details-selector/details-selector.component'
import { VideoPlayerComponent } from './components/video-player/video-player.component'
import { StatusComponent } from './components/status/status.component'
import { ProjectTitleComponent } from './components/project-title/project-title.component'
import { SecondaryViewComponent } from './components/secondary-view/secondary-view.component'

import { ErrorToastComponent } from './components/error-toast/error-toast.component'
// service
import { EditorService } from './services/editor/editor.service'
import { ObjectiveService } from './services/objectives/objectives.service'
import { AwsImgUploadService } from './services/aws-img-upload/aws-img-upload.service'
import { ContentService } from './services/contents/contents.service'
// pipe
import { StringDecoder } from './pipes/string-decoder.pipe'
import { CheckCount } from './pipes/check-count.pipe'
import { FilterBySubjectId } from './pipes/filter-by-subject.pipe'

@NgModule({
  declarations: [
    HomeComponent,
    EditorComponent,
    StepOneComponent,
    ProjectThumbnailComponent,
    CreateProjectComponent,
    HeaderComponent,
    SidebarComponent,
    ProjectTitleComponent,
    StepMenuComponent,
    StepTwoComponent,
    StatusComponent,
    StepSevenComponent,
    StepEightComponent,
    StepThreeComponent,
    StepFourComponent,
    StepFiveComponent,
    StepSixComponent,
    StepNineComponent,
    StepTenComponent,
    ProjectEditorComponent,
    ContextualHelpComponent,
    HelpAccordionComponent,
    HelpModalContentComponent,
    HelpLinkComponent,
    HelpVideoThumbComponent,
    VideoPlayerComponent,
    HelpImgThumbComponent,
    StringDecoder,
    CheckCount,
    FilterBySubjectId,
    PrincipalViewComponent,
    ModalStandardsComponent,
    StepUnlockComponent,
    DetailsSelectorComponent,
    ImageUploadComponent,
    SecondaryViewComponent,
    ErrorToastComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProjectEditorRoutingModule,
    ProjectEditorStoreModule,
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    AccordionModule.forRoot(),
    NgxDropzoneModule,
    PdfViewerModule,
    NgScrollbarModule,
    AlertModule.forRoot()
  ],
  providers: [
    EditorService,
    AwsImgUploadService,
    ObjectiveService,
    ContentService
  ]
})

export class ProjectEditorModule {

  constructor() {
    // ngx-bootstrap  theme
    setTheme('bs4')
  }
}
