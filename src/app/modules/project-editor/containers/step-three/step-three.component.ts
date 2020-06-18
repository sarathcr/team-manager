import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Step, Status } from '../../constants/step.model'
import { FieldConfig } from 'src/app/shared/constants/field.model'
import { EditorService } from '../../services/editor/editor.service'
import { TranslateService } from '@ngx-translate/core'
import { Subject } from 'src/app/shared/constants/subject.model'
import { FormThreeInitData, FormThree } from '../../constants/step-forms.model'
import { formThreeInitData } from '../../constants/step-forms.data'
import { CompetencyObjectives } from 'src/app/shared/constants/project.model'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss']
})
export class StepThreeComponent implements OnInit {

  project$: Observable<any>
  step$: Observable<Step>
  step: Step
  buttonConfig: FieldConfig
  textAreaConfig: FieldConfig
  competencyObjectives$: Observable<CompetencyObjectives[]>
  loading$: Observable<boolean>
  InputFormData: FormThreeInitData = new formThreeInitData
  initialFormData: FormThreeInitData = new formThreeInitData
  project: { subjects: Subject[], competencyObjectives: CompetencyObjectives[] }
  initialFormStatus: Status = "PENDING"
  numbers: any[] = []
  tempData: any[]

  constructor(private translateService: TranslateService, private editor: EditorService,) { }

  ngOnInit(): void {
    this.createFormConfig()
    this.createTempData()
    this.formInIt()
  }

  ngOnDestroy(): void {
    if (this.isFormUpdated()) {
      this.handleSubmit()
    }
  }

  // WIP
  addItem(i) {
    this.numbers.push(i)
    this.checkStatus()
  }

  removeItem(index) {
    this.numbers.splice(index, 1)
    this.checkStatus()
  }

  formInIt() {
    this.project$ = this.editor.getStepData('stepThree')
    this.step = this.editor.steps.three
    this.step$ = this.editor.getStepStatus(3)
    this.loading$ = this.editor.loading$
    let tempinitialFormData = new formThreeInitData
    this.project$.subscribe(data => {
      this.project = data
    })
    if (this.project$) {
      this.competencyObjectives$ = this.project$
        .pipe(
          map(data => data?.competencyObjectives)
        )
      this.competencyObjectives$
        .subscribe(competencyObjectives => {
          this.initialFormData.competencyObjectives = []
          if (competencyObjectives) {
            tempinitialFormData.competencyObjectives = [...competencyObjectives]
            this.InputFormData.competencyObjectives = [...competencyObjectives]
          }
          this.initialFormData.competencyObjectives = [...tempinitialFormData.competencyObjectives]
        })
    }
    if (this.step$) {
      this.step$.subscribe(
        formStatus => {
          if (formStatus) {
            this.buttonConfig.submitted = formStatus.state == "DONE"
            this.initialFormStatus = formStatus.state
            if (formStatus.state != "DONE" && !this.hasAnyEmptyFields())
              this.buttonConfig.disabled = false
          }
        }
      )
    }
    // this.project$.subscribe(subjects => this.subjects = subjects)
  }

  textAreaUpdate(data) { // calls on every update
    this.InputFormData.competencyObjectives = data
    this.checkStatus()
  }

  // checks if the form is empty
  isFormEmpty() {
    if (!this.InputFormData.competencyObjectives.length && !this.numbers.length) {
      return true
    }
    return false
  }

  // checks the form is completely filled or not
  hasAnyEmptyFields() {
    if (!this.InputFormData.competencyObjectives.length || !this.numbers.length) return true
    let emptyForm = false
    let subjectsCount = this.project.subjects.length
    for (let i = 0; i < subjectsCount; i++) {
      if (!this.numbers.includes(i)) emptyForm = true
    }
    if (emptyForm) return true
    return false
  }

  // Function to check status of step
  checkStatus() {
    if (this.isFormEmpty())
      this.step.state = "PENDING"
    else
      this.step.state = "INPROCESS"
    this.handleButtonType()
  }

  // Changes the button according to form status
  handleButtonType() {
    if (this.step.state == 'DONE') {
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
  isFormUpdated() {
    if (!this.isEqual(this.initialFormData.competencyObjectives,
      this.InputFormData.competencyObjectives) || this.initialFormStatus !== this.step.state) {
      return true
    }
    return false
  }

  isEqual(d1: any[], d2: any[]) {
    d1 = d1.map(item => item.name)
    d2 = d2.map(item => item.name)
    return JSON.stringify(d1) === JSON.stringify(d2)
  }

  handleSubmit(formStatus?: Status) {
    if (formStatus == 'DONE') {
      this.step.state = 'DONE'
      this.initialFormStatus = "DONE"
    }
    else
      this.checkStatus()
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
    let formData: FormThree = {
      data: {
        competencyObjectives: tempData.length ? this.InputFormData.competencyObjectives : []
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
    this.editor.handleStepSubmit(formData, this.step.state == "DONE")
    this.handleButtonType()
  }

  createFormConfig() {
    this.buttonConfig = {
      name: 'submit',
      field: 'button',
      id: 'submitButton',
      disabled: true,
      submitted: false,
      label: 'IR A PUNTO DE PARTIDA'
    };
    this.textAreaConfig = {
      name: 'textarea',
      field: 'competencyObjectives',
      id: 'competencyObjectives',
      maxLength: 150,
      limit: 5
    }

    // Translation
    this.translateService.stream([
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

  createTempData() {
    this.tempData = [
      {
        id: 1,
        name: "evaluation criteria1",
      }
    ]
  }



}

