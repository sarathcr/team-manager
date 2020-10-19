import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'

import { StepFiveComponent } from './step-five.component'

import { DebugElement } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { BsModalService } from 'ngx-bootstrap/modal'
import { BehaviorSubject, Observable } from 'rxjs'
import { ButtonComponent } from 'src/app/common-shared/components/button/button.component'
import { DetailsSelectorComponent } from 'src/app/common-shared/components/details-selector/details-selector.component'
import { EditableListComponent } from 'src/app/common-shared/components/editable-list/editable-list.component'
import { InfoToolTipComponent } from 'src/app/common-shared/components/info-tooltip/info-tooltip.component'
import { LoaderComponent } from 'src/app/common-shared/components/loader/loader.component'
import { TextareaComponent } from 'src/app/common-shared/components/textarea/textarea.component'
import { StepStatusComponent } from '../../components/step-status/step-status.component'
import { StepUnlockComponent } from '../../components/step-unlock/step-unlock.component'
import { Status } from '../../constants/model/project.model'
import { EditorService } from '../../services/editor/editor.service'
import { ObjectiveService } from '../../services/objectives/objectives.service'
import { EvaluationCriteriaEntityService } from '../../store/entity/evaluation-criteria/evaluation-criteria-entity.service'
import { ProjectEntityService } from '../../store/entity/project/project-entity.service'
import { StepStatusEntityService } from '../../store/entity/step-status/step-status-entity.service'

class ProjectEntityServiceStub {}
class StepStatusEntityServiceStub {}
class RouterStub {}
class EvaluationCriteriaEntityServiceStub {}
class ObjectiveServiceStub {}
class BsModalServiceStub {
  getModalsCount = (): number => 0
}

const dummySubjects = [
  {
    id: 1,
    name: 'subject 1',
    contents: [],
    customContents: [],
    evaluationCriteria: [],
  },
]
const academicYearDummy = {
  id: 1,
  academicYear: '2010-2011',
  startDate: new Date(),
  endDate: new Date(),
}
const dummyGrades = [{ id: 1, name: '1o de Primaria' }]
const dummyRegion = [
  { id: 1, name: 'Cataluña', country: { id: 1, name: 'España' } },
]
const dummyProject = {
  id: '123',
  name: 'Test project',
  subjects: dummySubjects,
  competencyObjectives: [
    {
      id: 1,
      name: 'Lorem Ipsum',
      standards: [],
      customStandards: [],
    },
  ],
  grades: dummyGrades,
  academicYear: academicYearDummy,
  region: dummyRegion,
}

const getDataByStep = (): Observable<any> => {
  return new BehaviorSubject(dummyProject)
}

const getStepStatus = (state: Status): Observable<any> => {
  return new BehaviorSubject({
    stepid: 1,
    state,
  })
}

describe('StepFiveComponent', (): void => {
  let component: StepFiveComponent
  let fixture: ComponentFixture<StepFiveComponent>
  let editor: EditorService

  const editorSpies = (state: Status): void => {
    editor.steps = [
      { stepid: 1, state: 'PENDING', name: '' },
      { stepid: 2, state: 'PENDING', name: '' },
      { stepid: 3, state: 'PENDING', name: '' },
      { stepid: 4, state: 'PENDING', name: '' },
      { stepid: 5, state: 'PENDING', name: '' },
    ]
    spyOn(editor, 'getDataByStep').and.returnValue(getDataByStep())
    spyOn(editor, 'getStepStatus').and.returnValue(getStepStatus(state))
    spyOn(editor, 'handleSubmit')
  }

  const getButtonElement = (): DebugElement => {
    return fixture.debugElement.query(By.directive(ButtonComponent))
  }

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [
        StepFiveComponent,
        TextareaComponent,
        ButtonComponent,
        StepStatusComponent,
        InfoToolTipComponent,
        LoaderComponent,
        StepUnlockComponent,
        DetailsSelectorComponent,
        TextareaComponent,
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
        {
          provide: EvaluationCriteriaEntityService,
          useClass: EvaluationCriteriaEntityServiceStub,
        },
        { provide: ObjectiveService, useClass: ObjectiveServiceStub },
      ],
      imports: [TranslateModule.forRoot(), FormsModule],
    })

    editor = TestBed.inject(EditorService)
    fixture = TestBed.createComponent(StepFiveComponent)
    component = fixture.componentInstance
  })

  afterEach((): void => {
    for (const competency of dummyProject.competencyObjectives) {
      competency.standards = []
      competency.customStandards = []
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
  it('should contain a editable list component if project has competancy objective', () => {
    editorSpies('PENDING')
    editor.loading$ = new BehaviorSubject(false)
    fixture.detectChanges()

    const editableListComponent = fixture.debugElement.query(
      By.directive(EditableListComponent)
    )

    expect(editableListComponent).toBeTruthy()
  })
  it('should change the status to INPROCESS and calls handleStepSubmit while adding custom standards', () => {
    editorSpies('PENDING')
    editor.loading$ = new BehaviorSubject(false)
    const handleStepSubmitMock = spyOn(editor, 'handleStepSubmit')
    fixture.detectChanges()

    component.textareaDataChange([{ name: 'Lorem Ipsum' }], 0)

    fixture.detectChanges()

    expect(component.step.state).toBe('INPROCESS')
    expect(handleStepSubmitMock).toHaveBeenCalled()
    expect(component.buttonConfig.submitted).toBeFalsy()
    expect(component.buttonConfig.disabled).toBeFalsy()
  })
  it('should change the status to INPROCESS and calls handleStepSubmit while editing custom standards', () => {
    editorSpies('DONE')
    editor.loading$ = new BehaviorSubject(false)
    const handleStepSubmitMock = spyOn(editor, 'handleStepSubmit')
    fixture.detectChanges()

    component.textItemEdit([{ name: 'Lorem Ipsum' }], 0)

    fixture.detectChanges()

    expect(component.step.state).toBe('INPROCESS')
    expect(handleStepSubmitMock).toHaveBeenCalled()
    expect(component.buttonConfig.submitted).toBeFalsy()
    expect(component.buttonConfig.disabled).toBeFalsy()
  })
  it('should change the status to INPROCESS on deleting custom standards and calls handleStepSubmit on destroy', () => {
    editorSpies('DONE')
    editor.loading$ = new BehaviorSubject(false)
    const handleStepSubmitMock = spyOn(editor, 'handleStepSubmit')
    fixture.detectChanges()

    component.textItemDelete([{ name: 'Lorem Ipsum' }], 0)

    fixture.detectChanges()
    fixture.destroy()

    expect(component.step.state).toBe('INPROCESS')
    expect(handleStepSubmitMock).toHaveBeenCalled()
    expect(component.buttonConfig.submitted).toBeFalsy()
    expect(component.buttonConfig.disabled).toBeFalsy()
  })
})
