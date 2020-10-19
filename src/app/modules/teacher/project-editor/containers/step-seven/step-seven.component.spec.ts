import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'

import { BsModalService } from 'ngx-bootstrap/modal'
import { BehaviorSubject, Observable } from 'rxjs'

import { ButtonComponent } from 'src/app/common-shared/components/button/button.component'
import { EditableListComponent } from 'src/app/common-shared/components/editable-list/editable-list.component'
import { InfoToolTipComponent } from 'src/app/common-shared/components/info-tooltip/info-tooltip.component'
import { TextareaComponent } from 'src/app/common-shared/components/textarea/textarea.component'
import { StepStatusComponent } from '../../components/step-status/step-status.component'
import { StepSevenComponent } from './step-seven.component'

import { EditorService } from '../../services/editor/editor.service'
import { ProjectEntityService } from '../../store/entity/project/project-entity.service'
import { StepStatusEntityService } from '../../store/entity/step-status/step-status-entity.service'

import { Status } from '../../constants/model/project.model'
import { FormSeven } from '../../constants/model/step-forms.model'

const getDataByStep = (): Observable<any> => {
  return new BehaviorSubject({
    ids: { 0: 1 },
    entities: {
      1: {
        id: 1,
        name: null,
        title: 'Lorem Ipsum',
      },
    },
  })
}

const getStepStatus = (state: Status): Observable<any> => {
  return new BehaviorSubject({
    stepid: 1,
    state,
  })
}

class ProjectEntityServiceStub {}
class StepStatusEntityServiceStub {}
class RouterStub {}
class BsModalServiceStub {}

describe('StepSevenComponent', () => {
  let component: StepSevenComponent
  let fixture: ComponentFixture<StepSevenComponent>
  let editor: EditorService

  const editorSpies = (state: Status): void => {
    editor.steps = [
      { stepid: 1, state: 'PENDING', name: '' },
      { stepid: 2, state: 'PENDING', name: '' },
      { stepid: 3, state: 'PENDING', name: '' },
      { stepid: 4, state: 'PENDING', name: '' },
      { stepid: 5, state: 'PENDING', name: '' },
      { stepid: 6, state: 'PENDING', name: '' },
      { stepid: 7, state, name: '' },
    ]
    spyOn(editor, 'getDataByStep').and.returnValue(getDataByStep())
    spyOn(editor, 'getStepStatus').and.returnValue(getStepStatus(state))
  }

  const getButtonElement = (): DebugElement => {
    return fixture.debugElement.query(By.directive(ButtonComponent))
  }

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [
        StepSevenComponent,
        StepStatusComponent,
        TextareaComponent,
        ButtonComponent,
        InfoToolTipComponent,
        EditableListComponent,
      ],
      providers: [
        { provide: ProjectEntityService, useClass: ProjectEntityServiceStub },
        {
          provide: StepStatusEntityService,
          useClass: StepStatusEntityServiceStub,
        },
        { provide: Router, useClass: RouterStub },
        { provide: BsModalService, useClass: BsModalServiceStub },
      ],
      imports: [TranslateModule.forRoot(), FormsModule],
    })

    editor = TestBed.inject(EditorService)
    fixture = TestBed.createComponent(StepSevenComponent)
    component = fixture.componentInstance
  })

  afterEach((): void => {
    component.isFormUpdated = false

    fixture.destroy()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })

  it('should contain an editable list, button and status components', () => {
    const editableListComponent = fixture.debugElement.query(
      By.directive(EditableListComponent)
    )
    const buttonElement: Element = getButtonElement().nativeElement
    const stepStatusComponent = fixture.debugElement.query(
      By.directive(StepStatusComponent)
    )

    expect(editableListComponent).toBeTruthy()
    expect(buttonElement).toBeTruthy()
    expect(stepStatusComponent).toBeTruthy()
  })

  it('should have button in diabled status when untouched', (): void => {
    expect(component.buttonConfig.disabled).toBeTruthy()
  })

  it('should have correct label for button when status is PENDING', () => {
    const buttonElement: Element = getButtonElement().nativeElement

    editorSpies('PENDING')
    fixture.detectChanges()

    expect(component.buttonConfig.submitted).toBeFalsy()
    expect(component.buttonConfig.disabled).toBeTruthy()
    expect(buttonElement.textContent).toContain(
      'PROJECT.project_button_markdone'
    )
  })

  it('should have correct properties for button when status is DONE', () => {
    const buttonElement: Element = getButtonElement().nativeElement
    component.drivingQuestions = [{ id: 1, name: 'lorem ipsum' }]
    editorSpies('DONE')

    fixture.detectChanges()

    expect(component.buttonConfig.submitted).toBeTruthy()
    expect(component.buttonConfig.disabled).toBeTruthy()
    expect(buttonElement.textContent).toContain('PROJECT.project_button_done')
  })

  it('should enable the button and the status when textarea is updated if status was DONE', () => {
    const buttonElement: Element = getButtonElement().nativeElement
    component.drivingQuestions = [{ id: 1, name: 'lorem ipsum' }]
    editorSpies('DONE')
    spyOn(editor, 'handleStepSubmit')

    fixture.detectChanges()
    expect(component.buttonConfig.submitted).toBeTruthy()
    expect(component.buttonConfig.disabled).toBeTruthy()
    expect(buttonElement.textContent).toContain('PROJECT.project_button_done')

    component.drivingQuestions = [{ id: 1, name: 'lorem ipsum' }]
    component.addDrivingQuestions()
    fixture.detectChanges()

    expect(component.buttonConfig.submitted).toBeFalsy()
    expect(component.buttonConfig.disabled).toBeFalsy()
    expect(buttonElement.textContent).toContain(
      'PROJECT.project_button_markdone'
    )
  })

  it('should enable the button and the status when list is updated if status was PENDING', () => {
    const buttonElement: Element = getButtonElement().nativeElement
    component.drivingQuestions = [{ id: 1, name: 'lorem ipsum' }]
    editorSpies('PENDING')
    spyOn(editor, 'handleStepSubmit')

    fixture.detectChanges()
    component.addDrivingQuestions()
    component.drivingQuestions = [{ id: 1, name: 'lorem ipsum' }]
    fixture.detectChanges()

    expect(component.buttonConfig.submitted).toBeFalsy()
    expect(component.buttonConfig.disabled).toBeTruthy()
    expect(buttonElement.textContent).toContain(
      'PROJECT.project_button_markdone'
    )

    component.addDrivingQuestions()
    fixture.detectChanges()

    expect(component.buttonConfig.submitted).toBeFalsy()
    expect(component.buttonConfig.disabled).toBeFalsy()
    expect(buttonElement.textContent).toContain(
      'PROJECT.project_button_markdone'
    )
  })

  it('should change the step status on editing the driving questions ', () => {
    editorSpies('DONE')
    spyOn(editor, 'handleStepSubmit')

    fixture.detectChanges()
    component.drivingQuestions = [
      { id: 1, name: 'lorem ipsum' },
      { id: 2, name: 'lorem ipsum' },
    ]
    component.editQuestion([
      { id: 1, name: 'lorem ipsum' },
      { id: 2, name: 'lorem ipsums' },
    ])
    const buttonElement: DebugElement = getButtonElement()

    fixture.detectChanges()

    expect(component.buttonConfig.submitted).toBeFalsy()
    expect(component.buttonConfig.disabled).toBeFalsy()
    expect(buttonElement.nativeElement.textContent).toContain(
      'PROJECT.project_button_markdone'
    )
  })

  it('should disable the done button if all the driving questions where deleted ', () => {
    editorSpies('INPROCESS')
    spyOn(editor, 'handleStepSubmit')

    fixture.detectChanges()

    component.drivingQuestions = [
      { id: 1, name: 'lorem ipsum' },
      { id: 2, name: 'lorem ipsum' },
    ]
    component.deleteQuestion([])

    fixture.detectChanges()

    expect(component.buttonConfig.disabled).toBeTruthy()
  })

  it('should enable the button if a driving questions is added to the list', () => {
    editorSpies('PENDING')
    spyOn(editor, 'handleStepSubmit')

    fixture.detectChanges()
    const buttonElement: Element = getButtonElement().nativeElement
    component.drivingQuestions = [{ id: 1, name: 'lorem ipsum' }]
    component.addDrivingQuestions()
    fixture.detectChanges()

    expect(component.buttonConfig.submitted).toBeFalsy()
    expect(component.buttonConfig.disabled).toBeFalsy()
    expect(buttonElement.textContent).toContain(
      'PROJECT.project_button_markdone'
    )
  })

  it('should call editorService handleStepSumbit function with valid data when handleButton is clicked', () => {
    const buttonElement: DebugElement = getButtonElement()
    component.drivingQuestions = [{ id: 1, name: 'lorem ipsum' }]
    editorSpies('INPROCESS')
    const handleStepSubmitMock = spyOn(editor, 'handleStepSubmit')
    fixture.detectChanges()
    component.addDrivingQuestions()
    fixture.detectChanges()

    const formData: FormSeven = {
      data: {
        drivingQuestions: component.drivingQuestions,
      },
      stepStatus: {
        steps: [
          {
            state: 'DONE',
            stepid: component.step.stepid,
          },
        ],
      },
    }

    buttonElement.triggerEventHandler('click', null)
    fixture.detectChanges()

    expect(handleStepSubmitMock).toHaveBeenCalledWith(formData, true)
  })

  it(
    'should call editorService handleStepSumbit function with valid data on component ' +
      ' destroy if any delete operation perfomed and form is not saved',
    () => {
      component.drivingQuestions = [{ id: 1, name: 'lorem ipsum' }]
      editorSpies('INPROCESS')
      const handleStaepSubmitMock = spyOn(editor, 'handleStepSubmit')
      fixture.detectChanges()

      component.deleteQuestion([{ name: 'lorem ipsum' }])
      fixture.detectChanges()
      const formData: FormSeven = {
        data: {
          drivingQuestions: component.drivingQuestions,
        },
        stepStatus: {
          steps: [
            {
              state: 'INPROCESS',
              stepid: component.step.stepid,
            },
          ],
        },
      }

      fixture.destroy()

      expect(handleStaepSubmitMock).toHaveBeenCalledWith(formData, false)
    }
  )

  it('should unsubscribe the subscriptions on destroy', (): void => {
    const unsubscription = spyOn(component.subscriptions, 'unsubscribe')

    fixture.destroy()

    expect(unsubscription).toHaveBeenCalled()
  })
})
