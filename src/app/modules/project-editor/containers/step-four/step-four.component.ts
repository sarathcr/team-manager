import { Component, OnInit, OnDestroy } from '@angular/core'

import { Observable } from 'rxjs'
import { TranslateService } from '@ngx-translate/core'
import { map } from 'rxjs/operators'

import { EditorService } from '../../services/editor/editor.service'
import { Project } from '../../constants/project.model'
import { Step, Status } from '../../constants/step.model'
import { Option, FieldConfig } from 'src/app/shared/constants/field.model'
import { SubSink } from 'src/app/shared/utility/subsink.utility'
import { BasicSkills } from 'src/app/shared/constants/curriculum-basic-skill.model'
import { CheckBoxData } from '../../components/checkbox/checkbox.component'
import { CurriculumBasicSkillsEntityService } from 'src/app/modules/project-editor/store/entity/curriculum-basic-skills/curriculum-basic-skills-entity.service'

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'

import { ModalComponent } from './../../components/modal/modal.component'
import { ModalUnlock } from './../../constants/modal-config.data'

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
  bsModalRef: BsModalRef
  constructor(
    public editor: EditorService,
    private translateService: TranslateService,
    private basicSkillsService: CurriculumBasicSkillsEntityService,
    private modalService: BsModalService
  ) { }
  subjectContents: any[] = []
  subjectTextArea: any[] = []

  ngOnInit(): void {
    // Temporory function
    this.createFormConfig()
    this.formInIt()
    this.getBasicSkills()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  // Temperory Function
  pushContent(hasCriteria: boolean, index: number): void {
    if (hasCriteria) {
      this.subjectContents[index].push({ name: 'Lenguajes básicos de programación.', id: this.contents.length })
      this.checkStepStatus()
    }
    else {
      this.getModal()
    }
  }

  // Temperory Function
  popConent(index: number): void {
    this.subjectContents[index].pop()
  }

  formInIt(): void {
    this.project$ = this.editor.getDataByStep(4)
    this.step$ = this.editor.getStepStatus()
    this.step = this.editor.steps[3]
    this.subscriptions.sink = this.editor.loading$.subscribe(value => !value ? this.loading = value : null)
    if (this.project$) {
      this.subscriptions.sink = this.project$.subscribe(data => {
        this.project = data
        if (this.project) {
          this.project.subjects.forEach(subject => {
            this.subjectContents.push([...subject.contents])
            this.subjectTextArea.push({ isShown: false })
          })
        }
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

  textareaBlur(data: Option[], index: number): void {
    if (data.length === 1 && data[0].name === null) {
      this.toggleTextarea(index)
    }
  }

  toggleTextarea(index: number): void {
    this.subjectTextArea[index].isShown = !this.subjectTextArea[index].isShown
  }

  getBasicSkills(): void {
    if (this.project) {
      const checkData: CheckBoxData = { checked: false, variant: 'checkedOnly'}
      this.selectedBasicSkills = [...this.project.basicSkills]
      this.subscriptions.sink = this.basicSkillsService.entities$
      .pipe(
        map(data => data.map(item => item?.basicSkills
          .map(({ id, code, description, name }) => ({ id, code, description, name })))))
      .subscribe( basicSkills => {
          if (!basicSkills.length && this.project){
            const parms = {
              regionId: this.project.region.id.toString(),
              academicyearId: this.project.academicYear.id.toString()
            }
            this.basicSkillsService.getWithQuery(parms)
          }
          basicSkills.forEach( basicSkill => {
            checkData.variant = 'checkedOnly'
            // checkData.checked = !!this.selectedBasicSkills.map( selected => selected.id).includes(basicSkill.id)
            this.basicSkills.push(...basicSkill)
            this.basicSkills.forEach( skill => {
              skill.checkData = {...checkData}
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
    }
  }

  getModal(): void {
    const initialState = { modalConfig: { ...ModalUnlock } }
    this.bsModalRef = this.modalService.show(ModalComponent, { class: 'common-modal', initialState })
    this.bsModalRef.content.closeBtnName = 'Close'
    this.bsModalRef.content.onClose.subscribe(result => {
      if (result) {
        this.editor.redirectToStep(3)
      }
    })
  }

  textareaDataChange(data: Option[], index: number): void {
    this.subjectTextArea[index].data = [...data]
    this.checkStepStatus()
  }

  handleSkillSelect(): void {
    this.checkStepStatus()
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

  checkStepStatus(): void {
    let hasContents = false
    let hasManualContents = false
    let hasSelectedSkills = false
    for (const contents of this.subjectContents) {
      if (contents?.length) {
        hasContents = true
      }
    }
    for (const manualContents of this.subjectTextArea) {
      if (manualContents?.data?.length) {
        hasManualContents = true
      }
    }
    if (this.basicSkills?.length) {
      for (const skills of this.basicSkills) {
        if (skills.checkData.checked === true) {
          hasSelectedSkills = true
        }
      }
    }
    if (hasContents || hasManualContents || hasSelectedSkills) {
      this.step.state = 'INPROCESS'
    } else {
      this.step.state = 'PENDING'
    }
    this.handleButtonType()
  }

  hasAnyEmptyFields(): boolean {
    let hasEmptyField = false
    for (const [index, contents] of this.subjectContents.entries()) {
      if (!contents?.length && !this.subjectTextArea[index]?.data?.length) {
        hasEmptyField = true
      }
    }
    if (this.basicSkills?.length) {
      const checkedArray = []
      for (const basicSkill of this.basicSkills) {
        checkedArray.push(basicSkill.checkData.checked)
      }
      if (!checkedArray.includes(true)) {
        hasEmptyField = true
      }
    }
    return hasEmptyField
  }

}
