import { Component, OnInit, OnDestroy } from '@angular/core'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { TranslateService } from '@ngx-translate/core'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'

import { EditorService } from '../../services/editor/editor.service'
import { GradeEntityService } from '../../store/entity/grade/grade-entity.service'

import { Step, Status } from '../../constants/step.model'
import { FieldConfig, Option } from 'src/app/shared/constants/field.model'
import { CompetencyObjectives, EvaluationCriteria } from 'src/app/modules/project-editor/constants/project.model'
import { FormThreeInit, FormThree } from '../../constants/step-forms.model'
import { PrincipalViewComponent } from '../../components/principal-view/principal-view.component'
import { Project } from './../../constants/project.model'

import { FormThreeInitData } from '../../constants/step-forms.data'

import { SubSink } from 'src/app/shared/utility/subsink.utility'
import { compareArray } from 'src/app/shared/utility/array.utility'

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss']
})
export class StepThreeComponent implements OnInit, OnDestroy {

  project$: Observable<Project>
  step$: Observable<Step>
  grades: Option[]
  step: Step
  buttonConfig: FieldConfig
  textAreaConfig: FieldConfig
  competencyObjectives$: Observable<CompetencyObjectives[]>
  evaluationCriteria$: Observable<EvaluationCriteria[]>
  loading = true
  InputFormData: FormThreeInit = new FormThreeInitData()
  initialFormData: FormThreeInit = new FormThreeInitData()
  project: Project
  initialFormStatus: Status = 'PENDING'
  initialCriterias: number[] = []
  criterias: number[] = []
  tempData: any[]
  bsModalRef: BsModalRef
  subscriptions = new SubSink()

  constructor(
    private translateService: TranslateService,
    public editor: EditorService,
    private modalService: BsModalService,
    private gradeService: GradeEntityService,
  ) { }

  ngOnInit(): void {
    this.createFormConfig()
    this.formInIt()
  }

  ngOnDestroy(): void {
    if (this.isFormUpdated() && this.step.state !== 'DONE') {
      this.handleSubmit()
    }
    const modalCount = this.modalService.getModalsCount()
    if (modalCount > 0) {
      this.modalService._hideModal(modalCount)
    }
    this.subscriptions.unsubscribe()
  }

  formInIt(): void {
    this.project$ = this.editor.getStepData(3)
    this.step$ = this.editor.getStepStatus()
    this.step = this.editor.steps[2]
    this.subscriptions.sink = this.editor.loading$.subscribe(value => !value ? this.loading = value : null)
    const tempinitialFormData = new FormThreeInitData()
    if (this.project$) {
      this.subscriptions.sink = this.project$.subscribe(data => {
        this.project = data
        this.getGrades(this.project)
      })
      this.competencyObjectives$ = this.project$
        .pipe(
          map(data => data?.competencyObjectives)
        )
      this.subscriptions.sink = this.competencyObjectives$
        .subscribe(competencyObjectives => {
          this.initialFormData.competencyObjectives = []
          if (competencyObjectives) {
            tempinitialFormData.competencyObjectives = [...competencyObjectives]
            this.InputFormData.competencyObjectives = [...competencyObjectives]
          }
          this.initialFormData.competencyObjectives = [...tempinitialFormData.competencyObjectives]
        })

      // this.evaluationCriteria$ = this.project$   // WIP
      //   .pipe(
      //     map(data => data?.evaluationCriteria)
      //   )
    }
    if (this.step$) {
      this.subscriptions.sink = this.step$.subscribe(
        formStatus => {
          if (formStatus) {
            this.buttonConfig.submitted = formStatus.state === 'DONE'
            this.initialFormStatus = formStatus.state
            if (formStatus.state !== 'DONE' && !this.checkInitialEmptyForm()) {
              this.buttonConfig.disabled = false
            }
          }
        }
      )
    }
  }

  getGrades(project: Project): void {
    if (this.project) {
      this.subscriptions.sink = this.gradeService.entities$
        .pipe(
          map(grades => grades.filter(grade => grade.academicYear?.id === project.academicYear.id
            && grade.region?.id === project.region.id))
        )
        .subscribe(newData => {
          if (!newData.length) {
            const parms = {
              regionId: project.region.id.toString(),
              academicyearId: project.academicYear.id.toString()
            }
            this.gradeService.getWithQuery(parms)
          }
          this.grades = newData.map(({ id, name }) => ({ id, name }))
        })
    }
  }
  // WIP
  addItem(event: any): void {
    this.criterias.push(event.id)
    if (!event.init) { this.checkStatus() }
  }

  // WIP
  removeItem(index: number): void {
    this.criterias.splice(index, 1)
    this.checkStatus()
  }

  textAreaUpdate(data: Option[]): void { // calls on every update
    this.InputFormData.competencyObjectives = data
    this.checkStatus()
  }

  // checks if the form is empty
  isFormEmpty(): boolean {
    if (!this.InputFormData.competencyObjectives.length && !this.criterias.length) {
      return true
    }
    return false
  }

  // check if the form is initially empty
  checkInitialEmptyForm(): boolean {                      // WIP
    if (!this.initialFormData.competencyObjectives.length || !this.initialCriterias.length) { return true }
    let emptyForm = false
    this.project.subjects.forEach(subject => {
      if (!this.initialCriterias.includes(subject.id)) { emptyForm = true }
    })
    if (emptyForm) { return true }
    return false
  }

  // checks the form is completely filled or not
  hasAnyEmptyFields(): boolean {
    if (!this.InputFormData.competencyObjectives.length || !this.criterias.length) { return true }
    let emptyForm = false
    this.project.subjects.forEach(subject => {
      if (!this.criterias.includes(subject.id)) { emptyForm = true }
    })
    if (emptyForm) { return true }
    return false
  }

  // Function to check status of step
  checkStatus(): void {
    if (this.isFormEmpty()) {
      this.step.state = 'PENDING'
    }
    else {
      this.step.state = 'INPROCESS'
    }
    this.handleButtonType()
  }

  // Changes the button according to form status
  handleButtonType(): void {
    if (this.step.state === 'DONE') {
      this.buttonConfig.submitted = true
      this.buttonConfig.disabled = true
    } else {
      if (this.hasAnyEmptyFields()) {
        this.buttonConfig.disabled = true
        this.buttonConfig.submitted = false
      } else {
        this.buttonConfig.disabled = false
        this.buttonConfig.submitted = false
      }
    }
  }

  // Function to check whether the form is updated
  isFormUpdated(): boolean {
    const initialData = this.initialFormData.competencyObjectives.map(item => item.name)
    const inputData = this.InputFormData.competencyObjectives.map(item => item.name)
    if (!compareArray(initialData, inputData)
      || !compareArray(this.initialCriterias, this.criterias)
      || this.initialFormStatus !== this.step.state) {
      return true
    }
    return false
  }

  // function to submit form data
  handleSubmit(formStatus?: Status): void {
    if (formStatus === 'DONE') {
      this.step.state = 'DONE'
      this.initialFormStatus = 'DONE'
    }
    else {
      this.checkStatus()
    }
    let tempData = this.InputFormData.competencyObjectives.filter(item => item.name != null && item.name.length)
    if (tempData.length) {
      tempData = tempData.map(item => item.id == null ? { name: item.name } : item)
      this.InputFormData.competencyObjectives = tempData
      this.initialFormData.competencyObjectives = tempData
    }
    else {
      this.InputFormData.competencyObjectives = []
      this.initialFormData.competencyObjectives = this.InputFormData.competencyObjectives
    }
    this.InputFormData.competencyObjectives = tempData
    const tempCriteria = []                       // WIP change the criteria creation
    this.criterias.forEach(subjectId => {
      tempCriteria.push({
        gradeId: 8,
        id: 1,
        subjectId,
        name: 'evaluation criteria1'
      })
    })
    const formData: FormThree = {
      data: {
        competencyObjectives: tempData.length ? this.InputFormData.competencyObjectives : [],
        evaluationCriteria: [...tempCriteria]
      },
      stepStatus: {
        steps: [
          {
            state: this.step.state,
            stepid: this.step.stepid
          }
        ]
      }
    }
    this.editor.handleStepSubmit(formData, this.step.state === 'DONE')
    this.handleButtonType()
  }

  createFormConfig(): void {
    this.buttonConfig = {
      name: 'submit',
      field: 'button',
      id: 'submitButton',
      disabled: true,
      submitted: false,
      label: 'IR A PUNTO DE PARTIDA'
    }
    this.textAreaConfig = {
      name: 'textarea',
      field: 'competencyObjectives',
      id: 'competencyObjectives',
      maxLength: 150,
      limit: 0
    }

    // Translation
    this.subscriptions.sink = this.translateService.stream([
      'PROJECT.project_button_markdone',
      'PROJECT.project_button_done',
      'OBJECTIVES.project_objectives_title',
      'OBJECTIVES.project_objectives_description',
      'OBJECTIVES.project_objectives_objectives_placeholder'
    ]).subscribe(translations => {
      this.buttonConfig.label = translations['PROJECT.project_button_markdone']
      this.buttonConfig.successLabel = translations['PROJECT.project_button_done']
      this.textAreaConfig.placeholder = translations['OBJECTIVES.project_objectives_objectives_placeholder']
    })
  }

  getEvaludationCriteria(): void {
    this.evaluationCriteria$ = this.project$.pipe(map(data => data?.evaluationCriteria))
    this.subscriptions.sink = this.evaluationCriteria$
      .subscribe(criterias => {
        this.criterias = []
        this.initialCriterias = []
        if (criterias) {
          criterias.forEach(criteria => {
            this.criterias.push(criteria.subjectId)
            this.initialCriterias.push(criteria.subjectId)
          })
        }
      })
  }

  openModalWithComponent(subjectId: number): void  {
    this.getEvaludationCriteria()
    const initialState = {
      grades: this.grades,
      selectedGrades: this.project.grades.map(({ id, name }) => ({ id, name })),
      subjectId,
      criterias: this.criterias
    }
    this.bsModalRef = this.modalService.show(PrincipalViewComponent,
      { class: 'competency-modal', initialState })
    this.bsModalRef.content.closeBtnName = 'Close'
  }
}

