import { DebugElement } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { BsModalService } from 'ngx-bootstrap/modal'
import { BehaviorSubject } from 'rxjs'
import { EditorService } from 'src/app/modules/project-editor/services/editor/editor.service'
import { ButtonComponent } from '../../../../../../shared/components/button/button.component'
import { ModalFormComponent } from '../../../../../../shared/components/modal-form/modal-form.component'
import { Activity } from '../../../../constants/model/activity.model'
import { ProjectEntityService } from '../../../../store/entity/project/project-entity.service'
import { StepStatusEntityService } from '../../../../store/entity/step-status/step-status-entity.service'
import { ActivityEditorService } from '../../../activity/services/activity-editor.service'
import { ContextualHelpComponent } from '../../../contextual-help/components/contextual-help/contextual-help.component'
import { HelpEntityService } from '../../../contextual-help/store/entity/help/help-entity.service'
import { EvaluationEditorComponent } from './evaluation-editor.component'

class ProjectEntityServiceStub {}
class ActivityEditorServiceStub {}
class StepStatusEntityServiceStub {}
class HelpEntityServiceStub {}
class RouterStub {}
class BsModalServiceStub {
  getModalsCount = (): number => 0
}

const activitiesDummy: Activity[] = []

describe('EvaluationEditorComponent', () => {
  let component: EvaluationEditorComponent
  let fixture: ComponentFixture<EvaluationEditorComponent>
  let editor: EditorService

  const getButtonElement = (): DebugElement => {
    const buttons = fixture.debugElement.queryAll(By.directive(ButtonComponent))
    return buttons[buttons.length - 1]
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EvaluationEditorComponent,
        ButtonComponent,
        ModalFormComponent,
        ContextualHelpComponent,
      ],
      providers: [
        { provide: ProjectEntityService, useClass: ProjectEntityServiceStub },
        { provide: Router, useClass: RouterStub },
        { provide: HelpEntityService, useClass: HelpEntityServiceStub },

        { provide: BsModalService, useClass: BsModalServiceStub },
        {
          provide: StepStatusEntityService,
          useClass: StepStatusEntityServiceStub,
        },
        {
          provider: ActivityEditorService,
          useClass: ActivityEditorServiceStub,
        },
      ],
      imports: [TranslateModule.forRoot()],
    })
    editor = TestBed.inject(EditorService)
    editor.activities$ = new BehaviorSubject(activitiesDummy)
    fixture = TestBed.createComponent(EvaluationEditorComponent)
    component = fixture.componentInstance

    fixture.detectChanges()
  }))

  afterEach((): void => {
    fixture.destroy()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should unsubscribe the subscriptions on destroy', (): void => {
    const unsubscription = spyOn(component.subscriptions, 'unsubscribe')
    fixture.destroy()
    expect(unsubscription).toHaveBeenCalled()
  })

  it('should have mew activity button and the text is correct', (): void => {
    expect(getButtonElement()).toBeDefined()
    expect(getButtonElement().nativeElement.textContent).toContain(
      'EVALUATION.evaluation_emptystate_exercises_button'
    )
  })

  it('should contains title', (): void => {
    const compiled = fixture.debugElement.query(By.css('.title_s'))
    const title = compiled.nativeElement
    expect(title.textContent).toContain(
      'EVALUATION.evaluation_emptystate_title'
    )
  })

  it('should contain subitle', (): void => {
    const compiled = fixture.debugElement.query(
      By.css('.evaluation__empty-description')
    )
    const subtitle = compiled.nativeElement
    expect(subtitle.textContent).toContain(
      'EVALUATION.evaluation_emptystate_description'
    )
  })

  it('should have puzzle and star image', (): void => {
    const compiled = fixture.debugElement.nativeElement
    expect(compiled.querySelector('img')).toHaveClass('evaluation__empty-image')
  })
})
