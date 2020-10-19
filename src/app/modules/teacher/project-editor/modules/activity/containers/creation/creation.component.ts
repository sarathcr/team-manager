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

  @ViewChild('addMaterial') addMaterial: TemplateRef<any>
  @ViewChild('excerciseModal') excerciseModal: TemplateRef<any>
  @ViewChild('excerciseTitleUpdate') excerciseTitleUpdate: TemplateRef<any>

  constructor(
    private editor: EditorService,
    private router: Router,
    private modalService: BsModalService,
    private projectService: ProjectEntityService,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.experienceType = this.editor.getExperienceUrl()
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

  addExcercise(exercise: Exercise): void {
    this.exerciseLoading = true
    this.isTitleConflict = false
    this.activity = unfreeze(this.activity)
    if (this.activity.exercises) {
      this.activity.exercises.push(exercise)
    } else {
      this.activity.exercises = [exercise]
    }
    this.saveExcercise(exercise, 'create')
  }

  saveExcercise(exercise: Exercise, updateType: string): void {
    this.projectSubscription.sink = this.editor
      .handleExerciseSubmit({ ...exercise, updateType })
      .subscribe((result) => {
        if (!result.error) {
          this.isTitleConflict = false
          // modal close delay
          this.clearTimeOuts.add = setTimeout(() => {
            this.exerciseLoading = false
          }, 500)
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
    this.exercise = $event
    this.openModal(this.excerciseModal)
  }
  // This deals with the  exercise title update
  handleExcerciseTitleUpdate($event: Exercise): void {
    this.exerciseTitleObject = $event
    this.modalRef = this.modalService.show(this.excerciseTitleUpdate, {
      ignoreBackdropClick: true,
      class: 'modal-form modal-dialog-centered',
    })
  }
  declinEditTitleModal(): void {
    this.isTitleConflict = false
    this.exerciseLoading = false
    this.modalRef.hide()
  }
  confirmExerciseTitleUpdate(event: string): void {
    this.isTitleConflict = false
    this.exerciseLoading = true
    const exerciseObj = unfreeze(this.exerciseTitleObject)
    exerciseObj.name = event
    this.saveExcercise(exerciseObj, 'update')
  }
  getExcerciseTitleValueChange(event: string): void {
    this.isTitleConflict = false
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
}
