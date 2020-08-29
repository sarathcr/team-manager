import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'

import { BsModalService } from 'ngx-bootstrap/modal'
import { BehaviorSubject, Observable } from 'rxjs'

import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { InfoToolTipComponent } from 'src/app/shared/components/info-tooltip/info-tooltip.component'
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component'
import { TextareaComponent } from 'src/app/shared/components/textarea/textarea.component'
import { StepStatusComponent } from '../../components/step-status/step-status.component'
import { StepUnlockComponent } from '../../components/step-unlock/step-unlock.component'
import { StepThreeComponent } from './step-three.component'

import { DetailsSelectorComponent } from 'src/app/shared/components/details-selector/details-selector.component'
import { EditorService } from '../../services/editor/editor.service'
import { ObjectiveService } from '../../services/objectives/objectives.service'
import { EvaluationCriteriaEntityService } from '../../store/entity/evaluation-criteria/evaluation-criteria-entity.service'
import { GradeEntityService } from '../../store/entity/grade/grade-entity.service'
import { ProjectEntityService } from '../../store/entity/project/project-entity.service'
import { StepStatusEntityService } from '../../store/entity/step-status/step-status-entity.service'

import { Status } from '../../constants/model/project.model'
import { FormThree } from '../../constants/model/step-forms.model'

class ProjectEntityServiceStub {}
class StepStatusEntityServiceStub {}
class RouterStub {}
class EvaluationCriteriaEntityServiceStub {}
class ObjectiveServiceStub {}
class GradeEntityServiceStub {
  entities$ = new BehaviorSubject(grades)
}
class BsModalServiceStub {
  getModalsCount = (): number => 0
}

const dummyData = { id: 1, name: 'lorem ipsum' }
const academicYear = {
  id: 1,
  academicYear: '2010-2011',
  startDate: new Date(),
  endDate: new Date(),
}
const dummyProject = {
  subjects: [
    {
      ...dummyData,
      evaluationCriteria: [],
    },
  ],
  competencyObjectives: [],
  grades: [dummyData],
  academicYear,
  region: dummyData,
}
const grades = [{ ...dummyData, academicYear, region: dummyData }]
const getDataByStep = (): Observable<any> => {
  return new BehaviorSubject(dummyProject)
}

const getStepStatus = (state: Status): Observable<any> => {
  return new BehaviorSubject({
    stepid: 1,
    state,
  })
}

describe('StepThreeComponent', (): void => {
  let component: StepThreeComponent
  let fixture: ComponentFixture<StepThreeComponent>
  let editor: EditorService

  const editorSpies = (state: Status): void => {
    editor.steps = [
      { stepid: 1, state: 'PENDING', name: '' },
      { stepid: 2, state, name: '' },
      { stepid: 3, state, name: '' },
    ]
    spyOn(editor, 'getDataByStep').and.returnValue(getDataByStep())
    spyOn(editor, 'getStepStatus').and.returnValue(getStepStatus(state))
    spyOn(editor, 'handleSubmit')
  }

  const getButtonElement = (): DebugElement => {
    const buttons = fixture.debugElement.queryAll(By.directive(ButtonComponent))
    return buttons[buttons.length - 1]
  }

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [
        StepThreeComponent,
        TextareaComponent,
        ButtonComponent,
        StepStatusComponent,
        InfoToolTipComponent,
        LoaderComponent,
        StepUnlockComponent,
        DetailsSelectorComponent,
        TextareaComponent,
      ],
      providers: [
        { provide: ProjectEntityService, useClass: ProjectEntityServiceStub },
        {
          provide: StepStatusEntityService,
          useClass: StepStatusEntityServiceStub,
        },
        { provide: Router, useClass: RouterStub },
        { provide: BsModalService, useClass: BsModalServiceStub },
        { provide: GradeEntityService, useClass: GradeEntityServiceStub },
        {
          provide: EvaluationCriteriaEntityService,
          useClass: EvaluationCriteriaEntityServiceStub,
        },
        { provide: ObjectiveService, useClass: ObjectiveServiceStub },
      ],
      imports: [TranslateModule.forRoot(), FormsModule],
    })

    editor = TestBed.inject(EditorService)
    fixture = TestBed.createComponent(StepThreeComponent)
    component = fixture.componentInstance
  })

  afterEach((): void => {
    if (component.project?.subjects[0]?.evaluationCriteria) {
      component.project.subjects[0].evaluationCriteria = []
    }
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

  it('should show loader if editor data is loading', () => {
    editorSpies('PENDING')
    editor.loading$ = new BehaviorSubject(true)

    fixture.detectChanges()
    const loaderElement: Element = fixture.debugElement.query(
      By.directive(LoaderComponent)
    ).nativeElement

    expect(loaderElement).toBeTruthy()
  })

  it('should show unlock component if subjects is not present in project', () => {
    editorSpies('PENDING')
    editor.loading$ = new BehaviorSubject(false)

    fixture.detectChanges()
    const unlockElement: Element = fixture.debugElement.query(
      By.directive(StepUnlockComponent)
    ).nativeElement

    expect(unlockElement).toBeTruthy()
  })

  it('should show button section if subjects are present in project', () => {
    editorSpies('PENDING')
    editor.loading$ = new BehaviorSubject(false)
    editor.project$ = new BehaviorSubject(dummyProject)
    component.project = dummyProject

    fixture.detectChanges()
    const buttonElement: Element = getButtonElement().nativeElement

    expect(component.buttonConfig.submitted).toBeFalsy()
    expect(component.buttonConfig.disabled).toBeTruthy()
    expect(buttonElement.textContent).toContain(
      'PROJECT.project_button_markdone'
    )
  })

  it('should change status if data entered in textarea and status was PENDING', () => {
    editorSpies('PENDING')
    editor.loading$ = new BehaviorSubject(false)
    editor.project$ = new BehaviorSubject(dummyProject)
    component.project = dummyProject

    fixture.detectChanges()
    const buttonElement: Element = getButtonElement().nativeElement
    component.competencyObjectives = [{ id: 1, name: 'lorem ipsum' }]
    component.addObjectives()

    fixture.detectChanges()

    expect(component.buttonConfig.submitted).toBeFalsy()
    expect(component.buttonConfig.disabled).toBeTruthy()
    expect(buttonElement.textContent).toContain(
      'PROJECT.project_button_markdone'
    )
  })

  it('should not change status if data entered in textarea and status was INPROCESS', () => {
    editorSpies('INPROCESS')
    editor.loading$ = new BehaviorSubject(false)
    editor.project$ = new BehaviorSubject(dummyProject)
    component.project = dummyProject

    fixture.detectChanges()
    const buttonElement: Element = getButtonElement().nativeElement

    component.addObjectives()

    fixture.detectChanges()

    expect(component.buttonConfig.submitted).toBeFalsy()
    expect(component.buttonConfig.disabled).toBeTruthy()
    expect(buttonElement.textContent).toContain(
      'PROJECT.project_button_markdone'
    )
  })

  it('should show same number of details selector as number of subjects', () => {
    editorSpies('PENDING')
    editor.loading$ = new BehaviorSubject(false)
    editor.project$ = new BehaviorSubject(dummyProject)
    component.project = dummyProject

    fixture.detectChanges()
    const DetailsSelectorElement: DebugElement[] = fixture.debugElement.queryAll(
      By.directive(DetailsSelectorComponent)
    )

    expect(DetailsSelectorElement.length).toBe(dummyProject.subjects.length)
  })

  it('should change the step status, if criterias are selected', () => {
    editorSpies('PENDING')
    editor.loading$ = new BehaviorSubject(false)
    editor.project$ = new BehaviorSubject(dummyProject)
    component.project = dummyProject
    component.modalRef = {
      content: null,
      hide: () => {},
      setClass: () => {},
    }
    spyOn(component.modalRef, 'hide')

    fixture.detectChanges()
    const buttonElement: Element = getButtonElement().nativeElement
    component.project.subjects[0].evaluationCriteria.push(dummyData)
    component.handleModalSubmit({
      subject: dummyProject.subjects[0],
      selectedItem: [dummyData],
    })
    component.competencyObjectives = [{ id: 1, name: 'lorem ipsum' }]
    component.addObjectives()
    fixture.detectChanges()

    expect(component.buttonConfig.submitted).toBeFalsy()
    expect(component.buttonConfig.disabled).toBeFalsy()
    expect(buttonElement.textContent).toContain(
      'PROJECT.project_button_markdone'
    )
  })

  it('should change the status to done, if button is clicked after criterias and text areas are selected', () => {
    editorSpies('PENDING')
    editor.loading$ = new BehaviorSubject(false)
    editor.project$ = new BehaviorSubject(dummyProject)
    component.project = dummyProject
    component.modalRef = {
      content: null,
      hide: () => {},
      setClass: () => {},
    }
    spyOn(component.modalRef, 'hide')

    fixture.detectChanges()
    const buttonElement: DebugElement = getButtonElement()
    component.project.subjects[0].evaluationCriteria.push(dummyData)
    component.handleModalSubmit({
      subject: dummyProject.subjects[0],
      selectedItem: [dummyData],
    })
    component.addObjectives()
    fixture.detectChanges()

    buttonElement.triggerEventHandler('click', null)

    fixture.detectChanges()

    expect(component.buttonConfig.submitted).toBeTruthy()
    expect(component.buttonConfig.disabled).toBeTruthy()
    expect(buttonElement.nativeElement.textContent).toContain(
      'PROJECT.project_button_done'
    )
  })

  it(
    'should call editorService handleStepSumbit function' +
      ' with valid data on component destroy if form is not saved',
    () => {
      editorSpies('PENDING')
      editor.loading$ = new BehaviorSubject(false)
      editor.project$ = new BehaviorSubject(dummyProject)
      component.project = dummyProject
      component.modalRef = {
        content: null,
        hide: () => {},
        setClass: () => {},
      }
      spyOn(component.modalRef, 'hide')
      const handleStepSubmitMock = spyOn(editor, 'handleStepSubmit')

      fixture.detectChanges()
      component.project.subjects[0].evaluationCriteria.push(dummyData)
      component.handleModalSubmit({
        subject: dummyProject.subjects[0],
        selectedItem: [dummyData],
      })
      component.addObjectives()
      fixture.detectChanges()
      const formData: FormThree = {
        data: {
          subjects: component.project.subjects,
          competencyObjectives: component.competencyObjectives,
        },
        stepStatus: {
          steps: [
            {
              state: component.step.state,
              stepid: component.step.stepid,
            },
          ],
        },
      }

      fixture.destroy()

      expect(handleStepSubmitMock).toHaveBeenCalledWith(formData, false)
    }
  )

  it('should change the step status on editing the objectives ', () => {
    editorSpies('DONE')
    editor.loading$ = new BehaviorSubject(false)
    editor.project$ = new BehaviorSubject(dummyProject)
    component.project = dummyProject
    component.modalRef = {
      content: null,
      hide: () => {},
      setClass: () => {},
    }
    spyOn(component.modalRef, 'hide')

    fixture.detectChanges()

    component.project.subjects[0].evaluationCriteria.push(dummyData)
    component.handleModalSubmit({
      subject: dummyProject.subjects[0],
      selectedItem: [dummyData],
    })
    component.competencyObjectives = [
      { id: 1, name: 'lorem ipsum' },
      { id: 2, name: 'lorem ipsum' },
    ]
    component.editObjective([
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

  it('should disable the done button if all the objectives where deleted ', () => {
    editorSpies('INPROCESS')
    editor.loading$ = new BehaviorSubject(false)
    editor.project$ = new BehaviorSubject(dummyProject)
    component.project = dummyProject
    component.modalRef = {
      content: null,
      hide: () => {},
      setClass: () => {},
    }
    spyOn(component.modalRef, 'hide')

    fixture.detectChanges()

    component.project.subjects[0].evaluationCriteria.push(dummyData)
    component.handleModalSubmit({
      subject: dummyProject.subjects[0],
      selectedItem: [dummyData],
    })
    component.competencyObjectives = [
      { id: 1, name: 'lorem ipsum' },
      { id: 2, name: 'lorem ipsum' },
    ]
    component.deleteObjective([])

    fixture.detectChanges()

    expect(component.buttonConfig.disabled).toBeTruthy()
  })

  it('should enable the button if an objective is added to the list and if criterias exists', () => {
    editorSpies('INPROCESS')
    editor.loading$ = new BehaviorSubject(false)
    editor.project$ = new BehaviorSubject(dummyProject)
    component.project = dummyProject
    component.modalRef = {
      content: null,
      hide: () => {},
      setClass: () => {},
    }
    spyOn(component.modalRef, 'hide')

    fixture.detectChanges()
    const buttonElement: Element = getButtonElement().nativeElement
    component.project.subjects[0].evaluationCriteria.push(dummyData)
    component.handleModalSubmit({
      subject: dummyProject.subjects[0],
      selectedItem: [dummyData],
    })
    component.competencyObjectives = [{ id: 1, name: 'lorem ipsum' }]
    component.addObjectives()

    fixture.detectChanges()

    expect(component.buttonConfig.submitted).toBeFalsy()
    expect(component.buttonConfig.disabled).toBeFalsy()
    expect(buttonElement.textContent).toContain(
      'PROJECT.project_button_markdone'
    )
  })
})
