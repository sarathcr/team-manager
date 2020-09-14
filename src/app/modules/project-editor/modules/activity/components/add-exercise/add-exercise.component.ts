import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core'
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import {
  Exercise,
  ReferenceMaterials,
  StatusMaterial,
} from 'src/app/modules/project-editor/constants/model/activity.model'
import { EditorService } from 'src/app/modules/project-editor/services/editor/editor.service'
import { DropdownConfigInit } from 'src/app/shared/constants/data/form-elements.data'
import { unfreeze } from 'src/app/shared/utility/object.utility'

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.scss'],
})
export class AddExerciseComponent implements OnInit {
  @Input() exercise: Exercise
  @Input() buttonLoading: boolean
  @Input() exercisePercent = 0
  @Output() declineModal = new EventEmitter()
  @Output() confirmModal = new EventEmitter()
  modalRef: BsModalRef
  creationModalityDropdown = new DropdownConfigInit('modality')
  calificationDropdown = new DropdownConfigInit('calification')
  modalitySelected = []
  showMaterial = false
  loading = false
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
  exercisePercentHelperText = ''
  minDate = new Date()
  constructor(
    private editor: EditorService,
    private router: Router,
    private modalService: BsModalService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.minDate.setDate(this.minDate.getDate() - 1)
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
    this.exercise = this.exercise ? this.exercise : new Exercise()
    this.creationModalityDropdown.disabled = false
    this.creationModalityDropdown.selectedItems = this.modalitySelected
    this.calificationDropdown.disabled = false
    this.exercise = unfreeze(this.exercise)
    if (this.exercise.evaluation === undefined) {
      this.exercise.evaluation = true
    }

    this.getExercisePercentHelperText()
    this.getModalityDropDownData()
  }

  onValueChange(event: any, type: string): void {
    if (typeof event === 'object') {
      this.exercise[type] = event?.value
    } else {
      if (type === 'percentage') {
        this.exercise[type] = parseInt(event, 10)
        this.getExercisePercentHelperText(this.exercise[type])
      } else {
        this.exercise[type] = event
      }
    }
    if (type === 'evaluation' && !this.exercise[type]) {
      this.exercise.percentage = null
      this.getExercisePercentHelperText(0)
    }
  }

  toggleModal(): void {
    this.showMaterial = !this.showMaterial
  }

  onDropdownSelect(event: any): void {
    if (this.creationModalityDropdown.selectedItems?.length) {
      this.exercise.delivery = this.creationModalityDropdown.selectedItems[0]?.name.toUpperCase()
    } else {
      this.exercise.delivery = null
    }
  }

  onDecline(event: string): void {
    this.declineModal.emit(event)
  }

  onConfirm(): void {
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
      ])
      .subscribe((translation) => {
        const helpertext = translation[
          'EXCERCISE.exercise_definition_popup_input_calification_info_under'
        ].split('|')
        const value =
          100 - (this.exercisePercent + (isNaN(inputValue) ? 0 : inputValue))
        if (value <= 0) {
          // 0 means 100, or
          this.exercisePercentHelperText = ''
        } else {
          this.exercisePercentHelperText = helpertext[0] + value + helpertext[1]
        }
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
            id: 'PRESENTIAL',
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
    this.exercise.referenceMaterials = this.exercise.referenceMaterials
      ? [...this.exercise.referenceMaterials, material]
      : [material]
    this.toggleModal()
  }

  deleteMaterial(index: number): void {
    this.exercise.referenceMaterials.splice(index, 1)
  }

  getActiveMaterialTab(tabNumber: number): void {
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
      this.onConfirm()
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
}
