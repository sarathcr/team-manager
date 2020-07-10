import {
  Component,
  OnInit,
  ElementRef,
  ViewChild, Input, Output, EventEmitter, TemplateRef, AfterViewInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { ProjectTitle } from '../../constants/model/project.model'

@Component({
  selector: 'app-project-title',
  templateUrl: './project-title.component.html',
  styleUrls: ['./project-title.component.scss']
})
export class ProjectTitleComponent implements OnInit, AfterViewInit {

  @ViewChild('titleInput') inputElement: ElementRef
  @Input() projectData: ProjectTitle
  @Input() maxLength: number
  @Output() titleSubmit = new EventEmitter()
  @ViewChild('titleModal') titleModal: TemplateRef<any>
  tempTitle: string
  showInputfield = true
  modalRef: BsModalRef
  projectUrl: string
  modalTitle: string
  modalConfirmLabel: string

  constructor(
    private modalService: BsModalService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.projectData?.title) {
      this.tempTitle = this.projectData?.title
      this.showInputfield = false
    }
    this.projectUrl = this.route.snapshot.paramMap.get('id')
  }

  ngAfterViewInit(): void {
    if (this.projectUrl === 'create') {
      this.openModal()
    }
  }

  // Function to submit event of input field.
  handleSubmit(value: string): void {
    this.tempTitle = value.trim()
    this.showInputfield = !this.tempTitle
    if ((this.tempTitle || this.projectData?.id)
      && (this.tempTitle !== this.projectData?.title)) { // check for same this.temptitle value
      this.titleSubmit.emit({ title: this.tempTitle })
    }
  }

  openModal(): void {
    this.modalTitle = !this.projectData?.id ? 'PROJECT.project_title_title_newtitle' : 'PROJECT.project_title_title_edittitle'
    this.modalConfirmLabel = !this.projectData?.id ? 'PROJECT.project_button_create' : 'PROJECT.project_button_save'
    this.modalRef = this.modalService.show(this.titleModal, {
      ignoreBackdropClick: true,
      class: 'modal-form'
    })
  }

  declineModal(): void {
    if (!this.projectData?.id) {
      this.router.navigate([`editor/projects`])
    }
    this.modalRef.hide()
  }

  confirmModal(data: string): void {
    this.handleSubmit(data)
    this.modalRef.hide()
  }

}
