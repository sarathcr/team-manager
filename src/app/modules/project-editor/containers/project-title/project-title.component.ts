import {
  Component,
  OnInit,
  ElementRef,
  ViewChild, Input, Output, EventEmitter, ChangeDetectorRef, TemplateRef, AfterViewInit } from '@angular/core'


import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { ProjectTitle } from '../../constants/model/project.model'

import { SubSink } from 'src/app/shared/utility/subsink.utility'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-project-title',
  templateUrl: './project-title.component.html',
  styleUrls: ['./project-title.component.scss']
})
export class ProjectTitleComponent implements OnInit, AfterViewInit {

  @ViewChild('titleInput') inputElement: ElementRef
  @Input() projectData: ProjectTitle
  @Input() maxLength: number
  @Input() placeholder: string
  @Output() titleSubmit = new EventEmitter()
  @Output() checkEditTitle = new EventEmitter()
  tempTitle: string
  showInputfield = true
  modalRef: BsModalRef
  subscription = new SubSink()
  projectUrl: string
  isShow = true
  @ViewChild('titleModal') titleModal: TemplateRef<any>

  constructor(
    private modalService: BsModalService,
    private changeDetection: ChangeDetectorRef,
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
      this.openModal(this.titleModal)
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

  openModal(modalTemplate: TemplateRef<any>): void {
    // this.subscription.sink = this.modalService.onHidden.subscribe(() => this.changeDetection.markForCheck())
    // const initialState = { modalConfig:
    //   {
    //     title: this.projectUrl === 'create' ?
      // 'PROJECT.project_title_title_newtitle' : 'PROJECT.project_title_title_edittitle',
    //     confirmLabel: 'PROJECT.project_button_create',
    //     inputValue: this.projectData?.title ? this.projectData?.title : '',
    //     variant: 'input'
    //   }}
    this.modalRef = this.modalService.show(modalTemplate, {
      ignoreBackdropClick: true,
      class: 'modal-form',
      initialState: {
        title: (this.projectUrl === 'create' ?
          'PROJECT.project_title_title_newtitle' : 'PROJECT.project_title_title_edittitle'),
      }
    })
    console.log(this.modalRef.content)
    // this.subscription.sink = this.modalService.onHidden.subscribe((reason: string) => {
    //   const hideType = this.bsModalRef.content.modalConfig.hideType
    //   const titleValue = this.bsModalRef.content.modalConfig.inputValue
    //   if (hideType === 'cancel' && !this.projectData.id) {
    //     this.router.navigate([`editor/projects`])
    //   }
    //   if (hideType === 'submit') {
    //     this.handleSubmit(titleValue)
    //   }
    //   this.subscription.unsubscribe()
    // })
  }

  declineModal(): void {
    this.modalRef.hide()
    this.isShow = false
  }

  confirmModal(data: string): void {
    // this.isShow = true
    this.handleSubmit(data)
    this.modalRef.hide()
  }

}
