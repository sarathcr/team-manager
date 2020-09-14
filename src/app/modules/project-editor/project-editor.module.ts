import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { PdfViewerModule } from 'ng2-pdf-viewer'
import { setTheme } from 'ngx-bootstrap/utils'
import { NgScrollbarModule } from 'ngx-scrollbar'
import { SharedModule } from 'src/app/shared/shared.module'
import { CardExperienceComponent } from './components/card-experience/card-experience.component'
import { CustomCheckBoxComponent } from './components/custom-checkbox/custom-checkbox.component'
import { EditorHeaderComponent } from './components/editor-header/editor-header.component'
import { ModalStandardsComponent } from './components/modal-standards/modal-standards.component'
import { PrincipalViewComponent } from './components/principal-view/principal-view.component'
import { ProjectTitleComponent } from './components/project-title/project-title.component'
import { SecondaryViewComponent } from './components/secondary-view/secondary-view.component'
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { StepMenuComponent } from './components/step-menu/step-menu.component'
import { StepStatusComponent } from './components/step-status/step-status.component'
import { StepUnlockComponent } from './components/step-unlock/step-unlock.component'
import { EditorComponent } from './containers/editor/editor.component'
import { ExperiencesComponent } from './containers/experiences/experiences.component'
import { HomeComponent } from './containers/home/home.component'
import { InspirationsComponent } from './containers/inspirations/inspirations.component'
import { StepEightComponent } from './containers/step-eight/step-eight.component'
import { StepFiveComponent } from './containers/step-five/step-five.component'
import { StepFourComponent } from './containers/step-four/step-four.component'
import { StepNineComponent } from './containers/step-nine/step-nine.component'
import { StepOneComponent } from './containers/step-one/step-one.component'
import { StepSevenComponent } from './containers/step-seven/step-seven.component'
import { StepSixComponent } from './containers/step-six/step-six.component'
import { StepThreeComponent } from './containers/step-three/step-three.component'
import { StepTwoComponent } from './containers/step-two/step-two.component'
import { StepsComponent } from './containers/steps/steps.component'
import { ContextualHelpModule } from './modules/contextual-help/contextual-help.module'
import { EvaluationModule } from './modules/evaluation/evaluation.module'
import { CheckCount } from './pipes/check-count.pipe'
import { FilterBySubjectId } from './pipes/filter-by-subject.pipe'
import { ProjectEditorRoutingModule } from './project-editor-routing.module'
import { ProjectEditorComponent } from './project-editor.component'
import { ContentService } from './services/contents/contents.service'
import { EditorService } from './services/editor/editor.service'
import { ObjectiveService } from './services/objectives/objectives.service'
import { ProjectEditorStoreModule } from './store/project-editor-store.module'
@NgModule({
  declarations: [
    HomeComponent,
    EditorComponent,
    StepOneComponent,
    CustomCheckBoxComponent,
    CardExperienceComponent,
    SidebarComponent,
    StepMenuComponent,
    StepTwoComponent,
    StepStatusComponent,
    StepSevenComponent,
    StepEightComponent,
    StepThreeComponent,
    StepFourComponent,
    StepFiveComponent,
    StepSixComponent,
    StepNineComponent,
    StepsComponent,
    EditorHeaderComponent,
    ProjectTitleComponent,
    ProjectEditorComponent,
    CheckCount,
    FilterBySubjectId,
    PrincipalViewComponent,
    ModalStandardsComponent,
    StepUnlockComponent,
    SecondaryViewComponent,
    ExperiencesComponent,
    InspirationsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProjectEditorRoutingModule,
    ProjectEditorStoreModule,
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
    NgScrollbarModule,
    ContextualHelpModule,
    EvaluationModule,
  ],
  providers: [EditorService, ObjectiveService, ContentService],
})
export class ProjectEditorModule {
  constructor() {
    // ngx-bootstrap  theme
    setTheme('bs4')
  }
}
