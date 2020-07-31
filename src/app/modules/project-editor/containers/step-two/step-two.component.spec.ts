import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { DebugElement } from '@angular/core'
import { By } from '@angular/platform-browser'

import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, Observable } from 'rxjs'

import { StepTwoComponent } from './step-two.component'
import { TextareaComponent } from 'src/app/shared/components/textarea/textarea.component'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { StatusComponent } from '../../components/status/status.component'
import { InfoToolTipComponent } from 'src/app/shared/components/info-tooltip/info-tooltip.component'
import { TextareaListComponent } from 'src/app/shared/components/textarea/textarea-list/textarea-list.component'

import { EditorService } from '../../services/editor/editor.service'
import { ProjectEntityService } from '../../store/entity/project/project-entity.service'
import { StepStatusEntityService } from '../../store/entity/step-status/step-status-entity.service'
import { Status } from '../../constants/model/project.model'
import { FormTwo } from '../../constants/model/step-forms.model'

const getDataByStep = (): Observable<any> => {
  return new BehaviorSubject({
    ids: { 0: 1 },
    entities: { 1:  {
      id: 1,
      name: null,
      title: 'Lorem Ipsum'
    }}
  })
}

const getStepStatus = (state: Status): Observable<any> => {
  return new BehaviorSubject({
    stepid: 1, state
  })
}

class ProjectEntityServiceStub { }
class StepStatusEntityServiceStub { }
class RouterStub { }

describe('TematicaComponent', (): void => {
  let component: StepTwoComponent
  let fixture: ComponentFixture<StepTwoComponent>
  let editor: EditorService

  const editorSpies = (state: Status): void => {
    editor.steps = [{ stepid: 1, state: 'PENDING', name: '' }, { stepid: 2, state, name: '' }]
    spyOn(editor, 'getDataByStep').and.returnValue(getDataByStep())
    spyOn(editor, 'getStepStatus').and.returnValue(getStepStatus(state))
  }

  const getButtonElement = (): DebugElement => {
    return fixture.debugElement.query(By.directive(ButtonComponent))
  }

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [
        StepTwoComponent,
        TextareaComponent,
        ButtonComponent,
        StatusComponent,
        InfoToolTipComponent,
        TextareaListComponent
      ],
      providers: [
        { provide: ProjectEntityService, useClass: ProjectEntityServiceStub },
        { provide: StepStatusEntityService, useClass: StepStatusEntityServiceStub },
        { provide: Router, useClass: RouterStub }
      ],
      imports: [ TranslateModule.forRoot(), FormsModule ]
    })

    editor = TestBed.inject(EditorService)
    fixture = TestBed.createComponent(StepTwoComponent)
    component = fixture.componentInstance
  })

  afterEach((): void => {
    fixture.destroy()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })

  it('should unsubscribe the subscriptions on destroy', (): void => {
    const unsubscription = spyOn(component.subscriptions, 'unsubscribe')

    fixture.destroy()

    expect(unsubscription).toHaveBeenCalled()
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
    expect(buttonElement.textContent).toContain('PROJECT.project_button_markdone')
  })

  it('should have correct properties for button when status is DONE', () => {
    const buttonElement: Element = getButtonElement().nativeElement
    component.themes = [{ id: 1, name: 'lorem ipsum'}]
    editorSpies('DONE')

    fixture.detectChanges()

    expect(component.buttonConfig.submitted).toBeTruthy()
    expect(component.buttonConfig.disabled).toBeTruthy()
    expect(buttonElement.textContent).toContain('PROJECT.project_button_done')
  })

  it('should enable the button and the status when textarea is ubdated if status was DONE', () => {
    const buttonElement: Element = getButtonElement().nativeElement
    component.themes = [{ id: 1, name: 'lorem ipsum'}]
    editorSpies('DONE')
    spyOn(editor, 'handleStepSubmit')

    fixture.detectChanges()
    expect(component.buttonConfig.submitted).toBeTruthy()
    expect(component.buttonConfig.disabled).toBeTruthy()
    expect(buttonElement.textContent).toContain('PROJECT.project_button_done')

    component.textAreaUpdate({ values: [{ id: 1, name: 'lorem ipsum'}], updated: true, status: 'INPROCESS' })
    fixture.detectChanges()

    expect(component.buttonConfig.submitted).toBeFalsy()
    expect(component.buttonConfig.disabled).toBeFalsy()
    expect(buttonElement.textContent).toContain('PROJECT.project_button_markdone')
  })

  it('should enable the button and the status when textarea is ubdated if status was PENDING', () => {
    const buttonElement: Element = getButtonElement().nativeElement
    component.themes = [{ id: 1, name: 'lorem ipsum'}]
    editorSpies('PENDING')
    spyOn(editor, 'handleStepSubmit')

    fixture.detectChanges()
    expect(component.buttonConfig.submitted).toBeFalsy()
    expect(component.buttonConfig.disabled).toBeTruthy()
    expect(buttonElement.textContent).toContain('PROJECT.project_button_markdone')

    component.textAreaUpdate({ values: [{ id: 1, name: 'lorem ipsum'}], updated: true, status: 'INPROCESS' })
    fixture.detectChanges()

    expect(component.buttonConfig.submitted).toBeFalsy()
    expect(component.buttonConfig.disabled).toBeFalsy()
    expect(buttonElement.textContent).toContain('PROJECT.project_button_markdone')
  })

  it('should not change the button and the status when textarea is ubdated if status was INPROCESS', () => {
    const buttonElement: Element = getButtonElement().nativeElement
    component.themes = [{ id: 1, name: 'lorem ipsum'}]
    editorSpies('INPROCESS')
    spyOn(editor, 'handleStepSubmit')

    fixture.detectChanges()
    expect(component.buttonConfig.submitted).toBeFalsy()
    expect(component.buttonConfig.disabled).toBeFalsy()
    expect(buttonElement.textContent).toContain('PROJECT.project_button_markdone')

    component.textAreaUpdate({ values: [{ id: 1, name: 'lorem ipsum'}], updated: true, status: 'INPROCESS' })
    fixture.detectChanges()

    expect(component.buttonConfig.submitted).toBeFalsy()
    expect(component.buttonConfig.disabled).toBeFalsy()
    expect(buttonElement.textContent).toContain('PROJECT.project_button_markdone')
  })

  it('should call editorService handleStepSumbit function with valid data when handleButton is clicked', () => {
    const buttonElement: DebugElement = getButtonElement()
    component.themes = [{ id: 1, name: 'lorem ipsum'}]
    editorSpies('INPROCESS')
    const handleStaepSubmitMock = spyOn(editor, 'handleStepSubmit')
    fixture.detectChanges()
    component.textAreaUpdate({ values: [{ id: 1, name: 'lorem ipsum'}], updated: true, status: 'INPROCESS' })
    fixture.detectChanges()

    const formData: FormTwo = {
      data: {
        themes: component.themes
      },
      stepStatus: {
        steps: [
          {
            state: 'DONE',
            stepid: component.step.stepid
          }
        ]
      }
    }

    buttonElement.triggerEventHandler('click', null)
    fixture.detectChanges()

    expect(handleStaepSubmitMock).toHaveBeenCalledWith(formData, true)
  })

  it('should call editorService handleStepSumbit function with valid data on component destroy if form is not saved',
    () => {
    component.themes = [{ id: 1, name: 'lorem ipsum'}]
    editorSpies('INPROCESS')
    const handleStaepSubmitMock = spyOn(editor, 'handleStepSubmit')
    fixture.detectChanges()

    component.textAreaUpdate({ values: [{ id: 1, name: 'lorem ipsum'}], updated: true, status: 'INPROCESS' })
    fixture.detectChanges()
    const formData: FormTwo = {
      data: {
        themes: component.themes
      },
      stepStatus: {
        steps: [
          {
            state: 'INPROCESS',
            stepid: component.step.stepid
          }
        ]
      }
    }

    fixture.destroy()

    expect(handleStaepSubmitMock).toHaveBeenCalledWith(formData, false)
  })

  it('should conatin status component', () => {
    const statusComponent = fixture.debugElement.query(By.directive(StatusComponent))

    expect(statusComponent).toBeTruthy()
  })

  it('should conatin textarea component with required props', () => {
    const textAreaComponent = fixture.debugElement.query(By.directive(TextareaComponent))
    expect(textAreaComponent.nativeElement.getAttribute('variant')).toBe('bullet')
    expect(textAreaComponent).toBeTruthy()
  })
})
