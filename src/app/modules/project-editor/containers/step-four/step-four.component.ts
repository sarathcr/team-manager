import { Component, OnInit, OnDestroy } from '@angular/core'

import { Observable } from 'rxjs'
import { TranslateService } from '@ngx-translate/core'
import { map } from 'rxjs/operators'

import { EditorService } from '../../services/editor/editor.service'
import { Project } from '../../constants/project.model'
import { Step, Status } from '../../constants/step.model'
import { Option, FieldConfig } from 'src/app/shared/constants/field.model'
import { SubSink } from 'src/app/shared/utility/subsink.utility'
import { EvaluationCriteriaEntityService } from '../../store/entity/evaluation-criteria/evaluation-criteria-entity.service'
import { BasicSkills } from 'src/app/shared/constants/basic-skill.model'
import { CheckBoxData } from '../../components/checkbox/checkbox.component'

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.scss']
})
export class StepFourComponent implements OnInit, OnDestroy {

  project$: Observable<Project>
  step$: Observable<Step>
  grades: Option[]
  step: Step
  project: Project
  loading = true
  buttonConfig: FieldConfig
  textAreaConfig: FieldConfig
  subscriptions = new SubSink()
  showTextarea = false
  initialFormStatus: Status = 'PENDING'
  contents: Option[] = []
  basicSkills: BasicSkills[] = []
  selectedBasicSkills: BasicSkills[] = []

  constructor(
    public editor: EditorService,
    private translateService: TranslateService,
    private evaluationService: EvaluationCriteriaEntityService
  ) { }

  ngOnInit(): void {
    // Temporory function
    this.pushContent()
    this.createFormConfig()
    this.formInIt()
    this.getBasicSkills()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  // Temperory Function
  pushContent(): void {
    this.contents.push({ name: 'Lenguajes básicos de programación.', id: this.contents.length })
  }

  // Temperory Function
  popConent(): void {
    this.contents.pop()
  }

  formInIt(): void {
    this.project$ = this.editor.getStepData(4)
    this.step$ = this.editor.getStepStatus()
    this.step = this.editor.steps[3]
    this.subscriptions.sink = this.editor.loading$.subscribe(value => !value ? this.loading = value : null)
    if (this.project$) {
      this.subscriptions.sink = this.project$.subscribe(data => {
        this.project = data
      })
    }
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
      'OBJECTIVES.project_objectives_description'
    ]).subscribe(translations => {
      this.buttonConfig.label = translations['PROJECT.project_button_markdone']
      this.buttonConfig.successLabel = translations['PROJECT.project_button_done']
    })
  }

  toggleTextarea(): void{
    this.showTextarea = !this.showTextarea
  }

  getEvaluationCriteiaIds(): number[] {
    const evaluationCriteriaIds = []
    for (const subject of this.project.subjects) {
      for ( const eCriteria of subject.evaluationCriteria) {
        evaluationCriteriaIds.push(eCriteria.id)
      }
    }
    return evaluationCriteriaIds
  }

  getBasicSkills(): void {
    if (!this.project.basicSkills?.length) {
      const evaluationCriteriaIds = this.getEvaluationCriteiaIds()
      const checkData: CheckBoxData = { checked: false, variant: 'checkedOnly'}
      this.selectedBasicSkills = [...this.project.basicSkills]
      this.subscriptions.sink = this.evaluationService.entities$
        .pipe(
          map(data => data.map( item => item?.basicSkills
            .map(({id, code, description, name}) => ({id, code, description, name})))))
        .subscribe( newData => {
          if (!newData.length && evaluationCriteriaIds.length) {
            this.evaluationService.getWithQuery(evaluationCriteriaIds.toString())
          }
          newData.forEach( basicSkills  => {
            checkData.variant = 'checkedOnly'
            checkData.checked = !basicSkills.filter( basicSkill => this.selectedBasicSkills
              .map( selected => selected.id).includes(basicSkill.id))
            this.basicSkills.push(...basicSkills)
            this.basicSkills.forEach( basicSkill => {
              basicSkill.checkData = {...checkData}
            })
          })
        })
    }
  }

  handleButtonClick(): void {
    if (this.basicSkills?.length) {
      const selectedBasicSkills = []
      for (const skills of this.basicSkills) {
        if (skills.checkData.checked === true) {
          selectedBasicSkills.push(skills)
        }
      }
      this.selectedBasicSkills = selectedBasicSkills
      console.log(this.selectedBasicSkills)
    }
  }

}
