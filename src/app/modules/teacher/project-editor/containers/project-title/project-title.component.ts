import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { Observable } from 'rxjs'
import { skip } from 'rxjs/operators'
import { SubSink } from 'src/app/common-shared/utility/subsink.utility'
import { ClearAllSetTimeouts } from 'src/app/common-shared/utility/timeout.utility'
import { Project, ProjectTitle } from '../../constants/model/project.model'
import { EditorService } from '../../services/editor/editor.service'

@Component({
  selector: 'app-project-title',
  templateUrl: './project-title.component.html',
  styleUrls: ['./project-title.component.scss'],
})
export class ProjectTitleComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('titleInput') inputElement: ElementRef
  @Input() projectData: ProjectTitle
  @Input() maxLength: number
  @Output() titleSubmit = new EventEmitter()
  @ViewChild('titleModal') titleModal: TemplateRef<any>
  tempTitle = ''
  showInputfield = true
  modalRef: BsModalRef
  projectUrl: string
  modalTitle: string
  project$: Observable<Project>
  modalConfirmLabel: string
  localExperienceType: number
  subscriptions = new SubSink()
  projectSubscriptions = new SubSink()
  clearTimeout = new ClearAllSetTimeouts()
  error = false
  buttonLoading = false
  isCreateModal = false
  showEditTitle = false
  inputTitle: string
  @HostListener('document:keydown.escape', ['$event']) handleKeyDown(
    event: KeyboardEvent
  ): void {
    if (!this.projectData?.id) {
      this.router.navigate([`editor/experiences`])
    }
    this.modalRef.hide()
  }

  constructor(
    private modalService: BsModalService,
    private router: Router,
    private route: ActivatedRoute,
    public editor: EditorService
  ) {}

  ngOnInit(): void {
    if (this.projectData?.title) {
      this.tempTitle = this.projectData?.title
      this.showInputfield = false
    }
    this.localExperienceType = this.editor.getLocalExperienceType()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
    this.projectSubscriptions.unsubscribe()
    this.editor.removeOneProjectFromCache('create')
    this.clearTimeout.clearAll()
  }

  ngAfterViewInit(): void {
    this.subscriptions.sink = this.route.params.subscribe((value) => {
      this.isCreateModal = value?.id === 'create'
      if (value.id && value.id !== 'create') {
        this.projectSubscriptions.sink = this.editor.project$?.subscribe(
          (project) => {
            if (
              project?.id &&
              !project.error &&
              project?.title === this.inputTitle
            ) {
              this.buttonLoading = true
              this.projectSubscriptions.unsubscribe()
              this.modalRef?.hide()
              this.modalCloseDelay(() => {
                this.buttonLoading = false
              })
            }
            if (project?.error) {
              this.error = !!project?.error
              this.buttonLoading = false
            }
          }
        )
      } else if (value.id === 'create') {
        this.tempTitle = ''
        this.getProjectData()
        this.openModal()
      }
    })
  }

  getProjectData(): void {
    this.project$ = this.editor.project$
    this.projectSubscriptions.sink = this.project$
      .pipe(skip(1))
      .subscribe((project) => {
        this.error = !!project?.error
        if (!project?.error && !this.isCreateModal) {
          this.modalRef?.hide()
          this.modalCloseDelay(() => {
            this.buttonLoading = false
            this.projectSubscriptions.unsubscribe()
          })
        } else if (project && project?.error) {
          this.buttonLoading = false
        }
      })
  }

  // Function to submit event of input field.
  handleSubmit(value: string): void {
    const tempTitle = value.trim()
    this.inputTitle = tempTitle
    this.showInputfield = !this.tempTitle
    if (
      (tempTitle || this.projectData?.id) &&
      tempTitle !== this.projectData?.title
    ) {
      // check for same this.temptitle value
      this.buttonLoading = true
      this.titleSubmit.emit({ title: tempTitle })
    } else if (
      this.projectData?.title &&
      tempTitle === this.projectData?.title
    ) {
      this.modalRef.hide()
    }
  }

  openModal(): void {
    this.modalTitle = !this.projectData?.id
      ? 'VARIABLES.experience_type_variable_3'
      : 'PROJECT.project_title_title_edittitle'
    this.modalConfirmLabel = !this.projectData?.id
      ? 'PROJECT.project_button_create'
      : 'PROJECT.project_button_save'
    this.showEditTitle = !!this.projectData?.id
    if (!this.isCreateModal) {
      this.getProjectData()
    }
    this.modalRef = this.modalService.show(this.titleModal, {
      ignoreBackdropClick: true,
      class: 'modal-form modal-dialog-centered',
    })
  }

  declineModal(): void {
    if (!this.projectData?.id) {
      this.router.navigate([`editor/experiences`])
    } else {
      this.modalCloseDelay(() => {
        this.editor.updateOneProjectFromCache({ error: null })
      })
    }
    this.modalRef.hide()
    this.modalCloseDelay(() => {
      this.error = false
      this.projectSubscriptions.unsubscribe()
      this.clearTimeout.clearAll()
    })
  }

  confirmModal(data: string): void {
    this.handleSubmit(data)
  }

  onValueChange(value: string): void {
    this.inputTitle = value?.trim()
    this.error = false
  }

  // function to manage the delay in modal closing
  modalCloseDelay(callback: any): void {
    this.clearTimeout.add = setTimeout(() => {
      callback()
    }, 500)
  }
}
