import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { DropdownConfigInit } from 'src/app/common-shared/constants/data/form-elements.data'
import { unfreeze } from 'src/app/common-shared/utility/object.utility'
import {
  EvaluationStrategy,
  Exercise,
  ReferenceMaterials,
  StatusMaterial,
} from 'src/app/modules/teacher/project-editor/constants/model/activity.model'
import { EditorService } from 'src/app/modules/teacher/project-editor/services/editor/editor.service'

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.scss'],
})
export class AddExerciseComponent implements OnInit {
  @Input() exercise: Exercise
  @Input() buttonLoading: boolean
  @Input() isEdit = false
  @Input() exercisePercent
  @Input() isTitleConflict
  @Output() declineModal = new EventEmitter()
  @Output() confirmModal = new EventEmitter()
  modalRef: BsModalRef
  isFormValid = false
  creationModalityDropdown = new DropdownConfigInit('modality')
  modalitySelected = []
  AgentDropDowns = []
  showMaterial = false
  loading = false
  instrumentModalIndex: number
  showInstrumentModal = false
  referenceMaterial: StatusMaterial = {
    status: 'default',
    fileType: 'DOCUMENT',
    previewImageUrl: '',
    sourceType: 'GOOGLEDRIVE',
    title: '',
    url: '',
    visible: true,
  }
  activeMaterialTab = 0
  currentMaterialView = 1
  exercisePercentHelperText = null
  showPercentError = false
  localExperienceType: number
  minDate = new Date()
  maxDate = new Date('9999-12-31')
  newEvaluationObj: EvaluationStrategy = {
    agent: 'NONE',
    id: null,
    instrument: null,
  }
  materialType: 'exercise' | 'instrument'
  constructor(
    private modalService: BsModalService,
    private translateService: TranslateService,
    private changeDetection: ChangeDetectorRef,
    private editor: EditorService
  ) {}

  ngOnInit(): void {
    this.localExperienceType = this.editor.getLocalExperienceType()
    this.minDate.setDate(this.minDate.getDate() - 1)
    const agentDropdown = new DropdownConfigInit('agentsDDl')
    agentDropdown.disabled = false
    this.getAgentsDropDownData(agentDropdown)
    this.AgentDropDowns.push(agentDropdown)

    if (this.exercise && this.exercise.delivery) {
      this.modalitySelected = [
        {
          id: this.exercise.delivery,
          name:
            this.exercise.delivery.charAt(0) +
            this.exercise.delivery.slice(1).toLowerCase(),
        },
      ]
    }
    const newExercise: Exercise = {
      evaluationStrategies: [unfreeze(this.newEvaluationObj)],
    }
    this.exercise = this.exercise ? this.exercise : newExercise
    this.creationModalityDropdown.disabled = false
    this.creationModalityDropdown.selectedItems = this.modalitySelected
    this.exercise = unfreeze(this.exercise)
    if (this.exercise.evaluation === undefined) {
      this.exercise.evaluation = true
    }
    if (this.isEdit && this.exercise?.percentage) {
      this.exercisePercent = this.exercisePercent - this.exercise?.percentage
    }
    this.getExercisePercentHelperText(this.exercise?.percentage || 0)
    this.getModalityDropDownData()
  }

  getFormValidStatus(): boolean {
    if (!this.exercise?.name) {
      return false
    }

    if (
      this.exercise.evaluation &&
      (this.exercise?.percentage > 100 || !this.exercise?.percentage)
    ) {
      return false
    }
    return true
  }

  onValueChange(event: any, type: string): void {
    if (typeof event === 'object') {
      this.exercise[type] = event?.value
    } else {
      if (type === 'percentage') {
        this.exercise[type] = event ? parseInt(event, 10) : null
        this.getExercisePercentHelperText(this.exercise[type])
      } else if (type === 'name') {
        if (this.isTitleConflict) {
          this.isTitleConflict = false
        }
        this.exercise[type] = event
      } else {
        this.exercise[type] = event
      }
    }
    if (type === 'evaluation' && !this.exercise[type]) {
      this.exercise.percentage = null
      this.getExercisePercentHelperText(0)
    } else if (type === 'evaluation' && this.exercise[type]) {
      this.getExercisePercentHelperText(this.exercise?.percentage || 0)
    }
    this.isFormValid = this.getFormValidStatus()
  }

  toggleModal(materialType: 'exercise' | 'instrument', index?: number): void {
    this.materialType = materialType
    if (materialType === 'instrument') {
      if (this.activeMaterialTab === 0 && this.currentMaterialView === 2) {
        this.currentMaterialView = 1
      } else {
        this.instrumentModalIndex = index
        this.showInstrumentModal = !this.showInstrumentModal
      }
    }
    if (materialType === 'exercise') {
      if (this.activeMaterialTab === 0 && this.currentMaterialView === 2) {
        this.currentMaterialView = 1
      } else {
        this.showMaterial = !this.showMaterial
      }
    }
    this.changeDetection.detectChanges()
  }

  onDropdownSelect(event: any): void {
    if (this.creationModalityDropdown.selectedItems?.length) {
      this.exercise.delivery = this.creationModalityDropdown.selectedItems[0]?.name.toUpperCase()
    } else {
      this.exercise.delivery = null
    }
    this.isFormValid = this.getFormValidStatus()
  }

  onDecline(event: string): void {
    this.declineModal.emit(event)
  }

  onConfirm(): void {
    this.isTitleConflict = false
    this.confirmModal.emit(this.exercise)
  }

  openModal(modal: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(modal, {
      class: 'modal-dialog-centered modal-layout_large',
    })
  }

  closeModal(): void {
    this.modalRef.hide()
  }

  getExercisePercentHelperText(inputValue: number = 0): void {
    this.translateService
      .stream([
        'EXCERCISE.exercise_definition_popup_input_calification_info_under',
        'EXCERCISE.exercise_definition_popup_input_calification_info_over',
      ])
      .subscribe((translation) => {
        const overHelperText =
          translation[
            'EXCERCISE.exercise_definition_popup_input_calification_info_over'
          ]
        const helpertext = translation[
          'EXCERCISE.exercise_definition_popup_input_calification_info_under'
        ].split('|')
        const value =
          100 - (this.exercisePercent + (isNaN(inputValue) ? 0 : inputValue))

        if (value === 0) {
          this.showPercentError = false
          this.exercisePercentHelperText = null
        } else if (value < 0) {
          if (inputValue <= 100) {
            // show new overpassing message
            this.showPercentError = false
            this.exercisePercentHelperText = overHelperText
          } else {
            // show current error message
            this.showPercentError = true
            this.exercisePercentHelperText = null
          }
        } else {
          this.exercisePercentHelperText = helpertext[0] + value + helpertext[1]
          this.showPercentError = false
        }

        this.isFormValid = this.getFormValidStatus()
      })
  }

  getModalityDropDownData(): void {
    this.translateService
      .stream([
        'ACTIVITY_DEFINITION.activity_definition_dropdown_modality_item2',
        'ACTIVITY_DEFINITION.activity_definition_dropdown_modality_item1',
      ])
      .subscribe((translations) => {
        this.creationModalityDropdown.data = [
          {
            id: 'ONLINE',
            name:
              translations[
                'ACTIVITY_DEFINITION.activity_definition_dropdown_modality_item2'
              ],
          },
          {
            id: 'PRESENCIAL',
            name:
              translations[
                'ACTIVITY_DEFINITION.activity_definition_dropdown_modality_item1'
              ],
          },
        ]
      })
  }

  onConfirmMaterial(): void {
    const material: ReferenceMaterials = this.referenceMaterial
    if (this.showInstrumentModal) {
      // activated modal is triggered from instrumento button click
      this.exercise.evaluationStrategies[
        this.instrumentModalIndex
      ].instrument = material
    } else {
      this.exercise.referenceMaterials = this.exercise.referenceMaterials
        ? [material, ...this.exercise.referenceMaterials]
        : [material]
    }
    this.resetTabs()
    this.showInstrumentModal
      ? this.toggleModal('instrument', 0)
      : this.toggleModal('exercise')
    this.isFormValid = this.getFormValidStatus()
  }

  deleteMaterial(index: number): void {
    this.exercise.referenceMaterials.splice(index, 1)
    this.changeDetection.detectChanges()
  }

  getActiveMaterialTab(tabNumber: number): void {
    this.referenceMaterial.status = 'default' // to reset the modal button on tab change
    this.activeMaterialTab = tabNumber
  }

  previousMaterialView(): void {
    this.referenceMaterial.status = 'default'
    --this.currentMaterialView
  }

  nextMaterialView(): void {
    this.referenceMaterial.status = 'default'
    ++this.currentMaterialView
  }

  getMaterialDetails({ callConfirm, ...material }: StatusMaterial): void {
    this.referenceMaterial = material
    if (callConfirm && material) {
      this.onConfirmMaterial()
    }
  }

  resetTabs(): void {
    this.currentMaterialView = 1
    this.activeMaterialTab = 0
    this.referenceMaterial = {
      status: 'default',
      fileType: 'DOCUMENT',
      previewImageUrl: '',
      sourceType: 'GOOGLEDRIVE',
      title: '',
      url: '',
      visible: true,
    }
  }
  addEvaluationBlock(): void {
    const crateAgentDropDown = new DropdownConfigInit(
      'agentsDDl' + this.AgentDropDowns.length
    )
    this.getAgentsDropDownData(crateAgentDropDown)
    crateAgentDropDown.disabled = false
    this.AgentDropDowns.push(crateAgentDropDown)

    if (this.exercise.evaluationStrategies?.length) {
      this.exercise.evaluationStrategies.push(unfreeze(this.newEvaluationObj))
    } else {
      this.exercise.evaluationStrategies = [unfreeze(this.newEvaluationObj)]
    }
    this.isFormValid = this.getFormValidStatus()
    this.changeDetection.detectChanges()
  }

  getAgentsDropDownData(dropDown: DropdownConfigInit): void {
    this.translateService
      .stream([
        'EXCERCISE.exercise_definition_popup_agent_option1',
        'EXCERCISE.exercise_definition_popup_agent_option2',
        'EXCERCISE.exercise_definition_popup_agent_option3',
      ])
      .subscribe((translations) => {
        dropDown.data = [
          {
            id: 'HETETOEVALUATION',
            name:
              translations['EXCERCISE.exercise_definition_popup_agent_option1'],
          },
          {
            id: 'SELFEVALUATION',
            name:
              translations['EXCERCISE.exercise_definition_popup_agent_option2'],
          },
          {
            id: 'COEVALUATION',
            name:
              translations['EXCERCISE.exercise_definition_popup_agent_option3'],
          },
        ]
      })
  }

  onAgentDropdownSelect(index: number): void {
    if (this.AgentDropDowns[index].selectedItems?.length) {
      this.exercise.evaluationStrategies[index].agent = this.AgentDropDowns[
        index
      ].selectedItems[0]?.id
    } else {
      this.exercise.evaluationStrategies[index].agent = 'NONE'
    }
    this.isFormValid = this.getFormValidStatus()
  }
  deleteInstrumentMaterial(index: number): void {
    this.exercise.evaluationStrategies[index].instrument = null
    this.isFormValid = this.getFormValidStatus()
    this.changeDetection.detectChanges()
  }
  deleteEvaluation(index: number): void {
    this.exercise.evaluationStrategies.splice(index, 1)
    this.isFormValid = this.getFormValidStatus()
    this.changeDetection.detectChanges()
  }
}
