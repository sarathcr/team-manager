import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core'
import { Router } from '@angular/router'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import {
  Activity,
  ActivityState,
  Content
} from 'src/app/modules/project-editor/constants/model/activity.model'
import { EditorService } from 'src/app/modules/project-editor/services/editor/editor.service'
import { FieldEvent } from 'src/app/shared/constants/model/form-elements.model'
import { SubSink } from 'src/app/shared/utility/subsink.utility'
import { CreationService } from '../../services/creation/creation.service'

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreationComponent implements OnInit, OnDestroy {
  activity: Activity
  projectId: number
  imageUrl: string
  isValidForm: boolean
  isFormUpdated = false
  buttonDisabled = true
  buttonSubmitted = false
  subscriptions = new SubSink()
  modalRef: BsModalRef
  linkContent: Content | false
  linkStatus = 'default'

  @ViewChild('addMaterial') addMaterial: TemplateRef<any>
  constructor(
    private editor: EditorService,
    private router: Router,
    private modalService: BsModalService,
    private creationService: CreationService
  ) {}

  ngOnInit(): void {
    this.creationInit()
  }

  ngOnDestroy(): void {
    if (this.isFormUpdated) {
      this.handleSubmit()
    }
  }
  creationInit(): void {
    this.activity = { ...this.editor.activity }
    this.projectId = this.editor.projectId
    this.imageUrl = this.activity.activityImageUrl
      ? this.activity.activityImageUrl
      : this.editor.project?.creativeImage
    this.checkMandatoryFields()
  }

  handleTextareaChange(data: FieldEvent): void {
    this.activity.instructions = data.value
    this.isFormUpdated = true
    this.checkFormState()
    this.checkMandatoryFields()
  }

  openModal(modal: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(modal, {
      class: 'modal-dialog-centered modal-layout_large',
    })
  }

  closeModal(): void {
    this.modalRef.hide()
  }

  addMaterials(materialType: string): void {
    // code after saving the contents in popups
    this.isFormUpdated = true
    this.checkFormState()
    this.checkMandatoryFields()
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

  onImageSelect(imgUrl: string): void {
    this.activity.activityImageUrl = imgUrl
    this.imageUrl = imgUrl
    this.isFormUpdated = true
    this.checkFormState()
    this.checkMandatoryFields()
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
    this.isFormUpdated = false
    if (this.activity.state === 'CREATED') {
      this.router.navigate([`editor/project/${this.projectId}/activities`])
    }
  }

  fetchLinkDetails(link: string): void {
    this.linkStatus = 'loading'
    this.creationService.getLinkDetails(link).subscribe(data => {
      if (data) {
        this.linkStatus = 'success'
        this.linkContent = data
      }
      else {
        this.linkStatus = 'failed'
      }
    })
  }
}
