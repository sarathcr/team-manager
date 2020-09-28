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
import { SubscriptionLike } from 'rxjs'
import {
  Activity,
  ActivityState,
  Exercise,
  ReferenceMaterials,
  StatusMaterial,
} from 'src/app/modules/project-editor/constants/model/activity.model'
import { Project } from 'src/app/modules/project-editor/constants/model/project.model'
import { EditorService } from 'src/app/modules/project-editor/services/editor/editor.service'
import { ProjectEntityService } from 'src/app/modules/project-editor/store/entity/project/project-entity.service'
import { FieldEvent } from 'src/app/shared/constants/model/form-elements.model'
import { unfreeze } from 'src/app/shared/utility/object.utility'
import { SubSink } from 'src/app/shared/utility/subsink.utility'

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

  @ViewChild('addMaterial') addMaterial: TemplateRef<any>
  @ViewChild('excerciseModal') excerciseModal: TemplateRef<any>
  constructor(
    private editor: EditorService,
    private router: Router,
    private modalService: BsModalService,
    private projectService: ProjectEntityService,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.creationInit()
    this.editor.setContextualhelpStep(21)
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
  creationInit(): void {
    this.subscriptions.sink = this.editor.activity$.subscribe((activity) => {
      this.activity = unfreeze(activity)
      this.exercisePercent = !this.activity?.exercises
        ? 0
        : this.activity?.exercises?.reduce((sum, exercise) => {
            return sum + (exercise.percentage || null)
          }, 0)
    })
    if (this.activity.referenceMaterials) {
      this.activity.referenceMaterials = unfreeze(
        this.activity.referenceMaterials
      ).reverse()
    }
    this.subscriptions.sink = this.editor.project$.subscribe(
      (project) => (this.project = { ...project })
    )
    this.imageUrl = this.activity.activityImageUrl
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
      this.modalRef.hide()
    }
  }

  addMaterials(material: ReferenceMaterials): void {
    this.materialLoading = true
    this.activity = unfreeze(this.activity)
    if (this.activity.referenceMaterials) {
      this.activity.referenceMaterials.unshift(material)
    } else {
      this.activity.referenceMaterials = [material]
    }
    this.submitDatachange()
    this.closeModal()
    this.changeDetection.detectChanges()
  }

  addExcercise(exercise: Exercise): void {
    this.exerciseLoading = true
    let projectSubscription: SubscriptionLike
    this.activity = unfreeze(this.activity)
    if (this.activity.exercises) {
      this.activity.exercises.unshift(exercise)
    } else {
      this.activity.exercises = [exercise]
    }
    // this.updateMaterial()
    this.checkFormState()
    this.checkMandatoryFields()
    this.editor.handleExerciseSubmit({ ...exercise, updateType: 'create' })

    projectSubscription = this.projectService.loading$.subscribe((loading) => {
      if (!loading) {
        this.handleSubmit()
        this.exerciseLoading = false
        this.closeModal()
        projectSubscription.unsubscribe()
      }
    })
    this.changeDetection.detectChanges()
  }

  handleExerciseEdit($event: Exercise): void {
    this.exercise = $event
    this.openModal(this.excerciseModal)
  }

  changeVisibility(id: number, visible: boolean): void {
    this.activity = unfreeze(this.activity)
    this.activity.referenceMaterials.find(
      (material) => material.id === id
    ).visible = visible
    this.submitDatachange()
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
    if (
      this.activity.referenceMaterials?.length &&
      this.activity.exercises?.length
    ) {
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
    if (this.activity.state === 'CREATED') {
      if (this.isValidForm) {
        this.buttonDisabled = true
        this.buttonSubmitted = true
      } else {
        this.buttonDisabled = true
        this.buttonSubmitted = false
      }
    }
    if (this.activity.state === 'DEFINED') {
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
    let materials: ReferenceMaterials[] = []
    materials = excerice?.referenceMaterials?.length
      ? [...excerice.referenceMaterials]
      : []
    excerice?.evaluationStrategies?.forEach((item) => {
      if (item.instrument.sourceType === 'LOCALDRIVE') {
        item.instrument.previewImageUrl = '' // to change the material card variant for instrument upload
        item.instrument.fileType = 'INSTRUMENTUPLOAD'
      }
      item.instrument.entityType = 'instrument'
      materials.push(item.instrument)
    })

    return materials
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
