import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { Router } from '@angular/router'

import { StepFiveComponent } from './step-five.component'

import { EditorService } from '../../services/editor/editor.service'
import { ProjectEntityService } from '../../store/entity/project/project-entity.service'
import { StepStatusEntityService } from '../../store/entity/step-status/step-status-entity.service'
import { InfoToolTipComponent } from 'src/app/shared/components/info-tooltip/info-tooltip.component'
import { BsModalService } from 'ngx-bootstrap/modal'
import { Observable, BehaviorSubject } from 'rxjs'
import { Status } from '../../constants/model/project.model'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { By } from '@angular/platform-browser'
import { TextareaComponent } from 'src/app/shared/components/textarea/textarea.component'
import { StatusComponent } from '../../components/status/status.component'
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component'
import { StepUnlockComponent } from '../../components/step-unlock/step-unlock.component'
import { DetailsSelectorComponent } from '../../components/details-selector/details-selector.component'
import { TextareaListComponent } from 'src/app/shared/components/textarea/textarea-list/textarea-list.component'
import { GradeEntityService } from '../../store/entity/grade/grade-entity.service'
import { EvaluationCriteriaEntityService } from '../../store/entity/evaluation-criteria/evaluation-criteria-entity.service'
import { ObjectiveService } from '../../services/objectives/objectives.service'
import { FormsModule } from '@angular/forms'

class ProjectEntityServiceStub { }
class StepStatusEntityServiceStub { }
class RouterStub { }
class EvaluationCriteriaEntityServiceStub { }
class ObjectiveServiceStub { }
class BsModalServiceStub {
  getModalsCount = (): number => 0
}

const dummySubjects = [{
    id: 1,
    name: 'subject 1',
    contents: [],
    customContents: [],
    evaluationCriteria: []
  }]
const academicYearDummy = { id: 1, academicYear: '2010-2011', startDate: new Date(), endDate: new Date() }
const dummyGrades = [{id: 1, name: '1o de Primaria' }]
const dummyRegion = [{id: 1, name: 'Cataluña', country: {id: 1, name: 'España'}}]
const dummyProject = {
  id: '123',
  name: 'Test project',
  subjects: dummySubjects ,
  competencyObjectives: [],
  grades: dummyGrades,
  academicYear:  academicYearDummy,
  region: dummyRegion
}

const getDataByStep = (): Observable<any> => {
  return new BehaviorSubject(dummyProject)
}

const getStepStatus = (state: Status): Observable<any> => {
  return new BehaviorSubject({
    stepid: 1, state
  })
}

describe('StepFiveComponent', (): void => {
  let component: StepFiveComponent
  let fixture: ComponentFixture<StepFiveComponent>
  let editor: EditorService

  const editorSpies = (state: Status): void => {
    editor.steps = [
      { stepid: 1, state: 'PENDING', name: '' }, { stepid: 2, state, name: '' }, { stepid: 3, state, name: '' }
    ]
    spyOn(editor, 'getDataByStep').and.returnValue(getDataByStep())
    spyOn(editor, 'getStepStatus').and.returnValue(getStepStatus(state))
    spyOn(editor, 'handleSubmit')
  }


  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [
        StepFiveComponent,
        TextareaComponent,
        ButtonComponent,
        StatusComponent,
        InfoToolTipComponent,
        LoaderComponent,
        StepUnlockComponent,
        DetailsSelectorComponent,
        TextareaComponent,
        TextareaListComponent
      ],
      providers: [
        { provide: ProjectEntityService, useClass: ProjectEntityServiceStub },
        { provide: StepStatusEntityService, useClass: StepStatusEntityServiceStub },
        { provide: Router, useClass: RouterStub },
        { provide: BsModalService, useClass: BsModalServiceStub },
        { provide: GradeEntityService, useClass: ProjectEntityServiceStub },
        { provide: EvaluationCriteriaEntityService, useClass: EvaluationCriteriaEntityServiceStub },
        { provide: ObjectiveService, useClass: ObjectiveServiceStub },
      ],
      imports: [ TranslateModule.forRoot(), FormsModule ]
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
    const loaderElement: Element = fixture.debugElement.query(By.directive(LoaderComponent)).nativeElement

    expect(loaderElement).toBeTruthy()
  })

})
