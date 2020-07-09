import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
// lib's
import { setTheme } from 'ngx-bootstrap/utils'
import { TabsModule } from 'ngx-bootstrap/tabs'
import { AccordionModule } from 'ngx-bootstrap/accordion'
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal'
import { TranslateModule } from '@ngx-translate/core'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { PdfViewerModule } from 'ng2-pdf-viewer'
import { NgScrollbarModule } from 'ngx-scrollbar'
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
import { EditorHeaderComponent } from './components/editor-header/editor-header.component'
import { EditorSidebarComponent } from './components/editor-sidebar/editor-sidebar.component'
import { StepMenuComponent } from './components/step-menu/step-menu.component'
import { TextareaBulletsComponent } from './components/textarea-bullets/textarea-bullets.component'
import { TextareaComponent } from './components/textarea/textarea.component'
import { HelpAccordionComponent } from './components/help-accordion/help-accordion.component'
import { HelpModalContentComponent } from './components/help-modal-content/help-modal-content.component'
import { HelpLinkComponent } from './components/help-link/help-link.component'
import { HelpVideoThumbComponent } from './components/help-video-thumb/help-video-thumb.component'
import { ImageUploadComponent } from './components/image-upload/image-upload.component'
import { HelpImgThumbComponent } from './components/help-img-thumb/help-img-thumb.component'
import { PrincipalViewComponent } from './components/principal-view/principal-view.component'
import { StepUnlockComponent } from './components/step-unlock/step-unlock.component'
import { DetailsSelectorComponent } from './components/details-selector/details-selector.component'
import { ModalInfoComponent } from './components/modal-info/modal-info.component'
import { VideoPlayerComponent } from './components/video-player/video-player.component'
import { StatusComponent } from './components/status/status.component'
import { ModalFormComponent } from './components/modal-form/modal-form.component'
import { ProjectTitleComponent } from './components/project-title/project-title.component'
import { InfoToolTipComponent } from 'src/app/shared/components/info-tooltip/info-tooltip.component'
import { InputComponent } from 'src/app/shared/components/input/input.component'
import { ValidatorComponent } from 'src/app/shared/components/validator/validator.component'
import { SecondaryViewComponent } from './components/secondary-view/secondary-view.component'
// service
import { EditorService } from './services/editor/editor.service'
import { ObjectiveService } from './services/objectives/objectives.service'
import { AwsImgUploadService } from './services/aws-img-upload/aws-img-upload.service'
// pipe
import { StringDecoder } from './pipes/string-decoder.pipe'
import { CheckCount } from './pipes/check-count.pipe'
import { ContentService } from './services/contents/contents.service'
import { TranslateCut } from '../../shared/pipe/translate-cut.pipe'
import { TextareaListComponent } from './components/textarea/textarea-list/textarea-list.component'

@NgModule({
  declarations: [
    HomeComponent,
    EditorComponent,
    StepOneComponent,
    ProjectThumbnailComponent,
    CreateProjectComponent,
    EditorHeaderComponent,
    EditorSidebarComponent,
    ProjectTitleComponent,
    StepMenuComponent,
    StepTwoComponent,
    TextareaBulletsComponent,
    StatusComponent,
    InfoToolTipComponent,
    StepSevenComponent,
    StepEightComponent,
    TextareaComponent,
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
    PrincipalViewComponent,
    StepUnlockComponent,
    DetailsSelectorComponent,
    ModalInfoComponent,
    InputComponent,
    ImageUploadComponent,
    SecondaryViewComponent,
    TextareaListComponent,
    ModalFormComponent,
    ValidatorComponent,
    TranslateCut
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
    ModalModule.forRoot(),
    NgxDropzoneModule,
    PdfViewerModule,
    NgScrollbarModule
  ],
  providers: [
    EditorService,
    AwsImgUploadService,
    BsModalRef,
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
