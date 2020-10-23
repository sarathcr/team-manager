import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core'
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { FieldEvent } from 'src/app/common-shared/constants/model/form-elements.model'
import { unfreeze } from 'src/app/common-shared/utility/object.utility'
import { SubSink } from 'src/app/common-shared/utility/subsink.utility'
import { ClearAllSetTimeouts } from 'src/app/common-shared/utility/timeout.utility'
import {
  Activity,
  ActivityState,
  Exercise,
  ReferenceMaterials,
  StatusMaterial,
} from 'src/app/modules/teacher/project-editor/constants/model/activity.model'
import { DraggableRow } from './../../constants/model/draggable-row.model'

import { Project } from 'src/app/modules/teacher/project-editor/constants/model/project.model'
import { EditorService } from 'src/app/modules/teacher/project-editor/services/editor/editor.service'
import { ProjectEntityService } from 'src/app/modules/teacher/project-editor/store/entity/project/project-entity.service'

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreationComponent implements OnInit, OnDestroy {
  activity: Activity
  project: Project
  imageUrl: string
  isValidForm: boolean
  buttonDisabled = true
  buttonSubmitted = false
  subscriptions = new SubSink()
  exerciseLoading = false
  materialLoading = false
  exercise: Exercise
  exerciseTitleObject: Exercise
  modalRef: BsModalRef
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
  exercisePercent = 0
  experienceType = ''
  isTitleConflict = false
  localExperienceType: number
  projectSubscription = new SubSink()
  clearTimeOuts = new ClearAllSetTimeouts()
  dropdownData: any
  exercisesBlock: any
  translations: string[]
  isExerciseEdit = false

  @ViewChild('addMaterial') addMaterial: TemplateRef<any>
  @ViewChild('excerciseModal') excerciseModal: TemplateRef<any>
  @ViewChild('excerciseTitleUpdate') excerciseTitleUpdate: TemplateRef<any>

  constructor(
    private editor: EditorService,
    private router: Router,
    private modalService: BsModalService,
    private projectService: ProjectEntityService,
    private changeDetection: ChangeDetectorRef,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.experienceType = this.editor.getExperienceUrl()
    this.initTranslations()
    this.creationInit()
    this.editor.setContextualhelpStep(21)
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
    this.clearTimeOuts.clearAll()
  }

  creationInit(): void {
    this.localExperienceType = this.editor.getLocalExperienceType()
    this.subscriptions.sink = this.editor.activity$.subscribe((activity) => {
      this.activity = unfreeze(activity)
      this.exercisePercent = !this.activity?.exercises
        ? 0
        : this.activity?.exercises?.reduce((sum, exercise) => {
            return sum + (exercise?.percentage || null)
          }, 0)
      this.exerciseBlock()
    })
    if (this.activity?.referenceMaterials) {
      this.activity.referenceMaterials = unfreeze(
        this.activity.referenceMaterials
      )
    }
    this.subscriptions.sink = this.editor.project$.subscribe(
      (project) => (this.project = { ...project })
    )
    this.imageUrl = this.activity?.activityImageUrl
      ? this.activity.activityImageUrl
      : this.project?.creativeImage
    this.checkMandatoryFields()
  }

  exerciseBlock(): void {
    this.dropdownData = [
      {
        icon: 'icon-ic_delete',
        text: this.translations['ACTIVITIES.activities_delete'],
        action: 'delete',
      },
    ]
    this.exercisesBlock = []
    this.activity?.exercises
      ?.sort((a, b) => (a.sortOrder > b.sortOrder ? 1 : -1))
      .forEach((item, index) => {
        let dragControls = []
        if (this.activity?.exercises?.length > 1) {
          dragControls = [
            {
              icon: 'icon-ic_up',
              text: this.translations['ACTIVITIES.item_moveup'],
              action: 'moveup',
              disabled: index === 0 ? true : false,
            },
            {
              icon: 'icon-ic_down',
              text: this.translations['ACTIVITIES.item_movedown'],
              action: 'movedown',
              disabled:
                index === this.activity?.exercises?.length - 1 ? true : false,
            },
          ]
        }
        this.exercisesBlock.push({
          exercise: item,
          dropdownData: [...dragControls, ...this.dropdownData],
        })
      })
  }

  handleTextareaChange(data: FieldEvent): void {
    this.activity.instructions = data.value
    this.checkFormState()
    this.checkMandatoryFields()
  }

  openModal(modal: TemplateRef<any>): void {
    this.isTitleConflict = false
    this.modalRef = this.modalService.show(modal, {
      ignoreBackdropClick: true,
      class: 'modal-dialog-centered modal-layout_large',
    })
  }

  closeModal(modalType?: 'material'): void {
    if (
      modalType &&
      modalType === 'material' &&
      this.activeMaterialTab === 0 &&
      this.currentMaterialView === 2
    ) {
      this.currentMaterialView = 1
    } else {
      this.modalRef?.hide()
    }
    if (this.exercise) {
      this.modalCloseDelay(() => {
        this.exercise = null
        this.isExerciseEdit = false
      })
    }
    this.projectSubscription.unsubscribe()
    this.editor.updateOneProjectFromCache({ error: null })
  }

  addMaterials(material: ReferenceMaterials): void {
    this.materialLoading = true
    this.activity = unfreeze(this.activity)
    if (this.activity.referenceMaterials) {
      this.activity.referenceMaterials.push(material)
    } else {
      this.activity.referenceMaterials = [material]
    }
    this.submitDatachange()
    this.closeModal()
    this.changeDetection.detectChanges()
  }

  // function to add or edit exercise
  addExcercise(exercise: Exercise): void {
    this.exerciseLoading = true
    this.isTitleConflict = false
    this.activity = unfreeze(this.activity)
    if (!exercise?.id) {
      if (this.activity.exercises) {
        this.activity.exercises.push(exercise)
      } else {
        this.activity.exercises = [exercise]
      }
    }
    const updateType = exercise?.id ? 'update' : 'create'
    if (
      updateType === 'create' ||
      (updateType === 'update' && this.isExerciseUpdated(exercise)) // new exercise or exercise updated
    ) {
      this.saveExcercise(exercise, updateType)
    } else {
      this.modalCloseDelay(() => {
        this.exerciseLoading = false
        this.isExerciseEdit = false
      })
      this.modalRef?.hide()
    }
  }

  isExerciseUpdated(exercise: Exercise): boolean {
    const initialValue = this.activity.exercises.find(
      (initialExercise) => initialExercise.id === exercise.id
    )
    if (JSON.stringify(initialValue) !== JSON.stringify(exercise)) {
      return true
    }
    return false
  }

  saveExcercise(exercise: Exercise, updateType: string): void {
    this.projectSubscription.sink = this.editor
      .handleExerciseSubmit({ ...exercise, updateType })
      .subscribe((result) => {
        if (!result.error) {
          this.isTitleConflict = false
          // modal close delay
          this.modalCloseDelay(() => {
            this.exerciseLoading = false
          })
          this.checkFormState()
          this.checkMandatoryFields()
          this.handleSubmit()
          this.closeModal()
          this.projectSubscription.unsubscribe()
        } else {
          this.exerciseLoading = false
          this.isTitleConflict = true
        }
      })
    this.changeDetection.detectChanges()
  }

  // This deals with the whole exercise Edit
  handleExerciseEdit($event: Exercise): void {
    this.isExerciseEdit = true
    this.exercise = $event
    this.openModal(this.excerciseModal)
  }

  // function to manage the delay in modal closing
  modalCloseDelay(callback: any): void {
    this.clearTimeOuts.add = setTimeout(() => {
      callback()
    }, 800)
  }

  changeVisibility(id: number, visible: boolean): void {
    this.activity = unfreeze(this.activity)
    this.activity.referenceMaterials.find(
      (material) => material.id === id
    ).visible = visible
    this.submitDatachange()
  }

  changeExerciseVisibility(data: any): void {
    const exerciseObj: Exercise = this.activity.exercises.filter(
      (item) => item.id === data.excericeId
    )[0]

    const referenceMaterialIndex = exerciseObj.referenceMaterials.findIndex(
      (item) => item.id === data.id
    )
    if (referenceMaterialIndex !== -1) {
      exerciseObj.referenceMaterials[referenceMaterialIndex].visible =
        data.visible
    } else {
      const materialIndex = exerciseObj.evaluationStrategies.findIndex(
        (item) => item?.instrument?.id === data.id
      )
      exerciseObj.evaluationStrategies[materialIndex].instrument.visible =
        data.visible
    }
    exerciseObj.isMaterialVisibiityChange = true
    this.saveExcercise(exerciseObj, 'update')
  }

  submitDatachange(): void {
    this.checkFormState()
    this.checkMandatoryFields()
    this.handleSubmit()
  }

  checkFormState(): void {
    if (this.activity.state === 'CREATED') {
      this.activity.state = 'DEFINED'
    }
  }

  checkMandatoryFields(): void {
    if (this.activity?.referenceMaterials?.length) {
      this.isValidForm = true
    } else {
      this.isValidForm = false
    }
    this.handleButtonType()
  }

  deleteMaterial(id: number): void {
    this.activity.referenceMaterials = this.activity.referenceMaterials?.filter(
      (material) => material.id !== id
    )
    this.submitDatachange()
  }

  onImageSelect(imgUrl: string): void {
    this.activity.activityImageUrl = imgUrl
    this.imageUrl = imgUrl
    this.submitDatachange()
  }

  handleButtonType(): void {
    if (this.activity?.state === 'CREATED') {
      if (this.isValidForm) {
        this.buttonDisabled = true
        this.buttonSubmitted = true
      } else {
        this.buttonDisabled = true
        this.buttonSubmitted = false
      }
    }
    if (this.activity?.state === 'DEFINED') {
      if (this.isValidForm) {
        this.buttonDisabled = false
        this.buttonSubmitted = false
      } else {
        this.buttonDisabled = true
        this.buttonSubmitted = false
      }
    }
  }

  handleSubmit(state?: ActivityState): void {
    if (state === 'CREATED') {
      this.activity.state = 'CREATED'
      this.handleButtonType()
    }
    const formData: Activity = {
      id: this.activity.id,
      instructions: this.activity.instructions
        ? this.activity.instructions
        : '',
      referenceMaterials: this.activity.referenceMaterials?.length
        ? this.activity.referenceMaterials
        : [],
      exercises: this.activity.exercises?.length ? this.activity.exercises : [],
      activityImageUrl: this.activity.activityImageUrl
        ? this.activity.activityImageUrl
        : '',
      state: this.activity.state,
    }
    this.editor.handleActivitySubmit({
      ...this.activity,
      ...formData,
      updateType: 'update',
    })
    if (this.activity.state === 'CREATED') {
      this.router.navigate([`editor/project/${this.project.id}/activities`])
    }
  }

  onMaterialConfirm(): void {
    if (this.referenceMaterial.fileType) {
      this.addMaterials(this.referenceMaterial)
    } else {
      this.closeModal()
    }
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

  getReferenceMaterials({ callConfirm, ...material }: StatusMaterial): void {
    this.referenceMaterial = material
    if (callConfirm && material) {
      this.onMaterialConfirm()
    }
  }
  getAllExcerciseMaterials(excerice: Exercise): ReferenceMaterials[] {
    excerice = unfreeze(excerice)
    let materials: ReferenceMaterials[] = []
    materials = excerice?.referenceMaterials?.length
      ? [...excerice.referenceMaterials]
      : []
    excerice?.evaluationStrategies?.forEach((item) => {
      if (item.instrument) {
        if (item.instrument.sourceType === 'LOCALDRIVE') {
          item.instrument.previewImageUrl = '' // to change the material card variant for instrument upload
          item.instrument.fileType = 'INSTRUMENTUPLOAD'
        }
        item.instrument.entityType = 'instrument'
        materials.push(item.instrument)
      }
    })

    return materials
  }

  getTranslationKey(delivery: string): string {
    switch (delivery) {
      case 'PRESENCIAL':
        return 'EXCERCISE_CARD.exercise_delivery_modality_online'
      case 'ONLINE':
        return 'EXCERCISE_CARD.exercise_delivery_modality_school'
      case 'OUTOFSHEDULE':
        return 'EXCERCISE_CARD.exercise_delivery_date_outofshedule'
      case 'UNSHEDULED':
        return 'EXCERCISE_CARD.exercise_delivery_date_unsheduled'
      default:
        return ''
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

  navigateToPreview(): void {
    this.router.navigate([
      `editor/${this.experienceType}/${this.project.id}/activity/${this.activity.id}/preview`,
    ])
  }

  initTranslations(): void {
    this.subscriptions.sink = this.translate
      .stream([
        'ACTIVITIES.activities_delete',
        'ACTIVITIES.item_moveup',
        'ACTIVITIES.item_movedown',
      ])
      .subscribe((translations) => {
        this.translations = translations
      })
  }

  executeDropdownActions(row: DraggableRow): void {
    let currentExercise: Exercise = this.exercisesBlock.filter(
      (exercise) => exercise.id === row.id
    )[0]
    currentExercise = {
      ...currentExercise,
      updateType: 'sortOrder',
    }
    switch (row.action) {
      case 'moveup': {
        const order = {
          id: row.id,
          sortOrder: row.sortOrder - 1,
        }
        this.editor.handleExerciseSubmit(currentExercise, order)
        break
      }
      case 'movedown': {
        const order = {
          id: row.id,
          sortOrder: row.sortOrder + 1,
        }
        this.editor.handleExerciseSubmit(currentExercise, order)
        break
      }
      case 'delete':
        this.handleExerciseDelete(row.id)
        break
    }
  }

  handleExerciseDelete(exerciseid: any): void {
    this.editor.handleExerciseSubmit({
      updateType: 'delete',
      id: exerciseid,
    })
  }
}
