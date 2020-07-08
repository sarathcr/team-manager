import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core'
import { ProjectTitle } from '../../constants/title-data.model'
import { ModalInput } from '../../constants/modal-form-config.data'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { ModalFormComponent } from '../modal-form/modal-form.component'

@Component({
  selector: 'app-project-title',
  templateUrl: './project-title.component.html',
  styleUrls: ['./project-title.component.scss']
})
export class ProjectTitleComponent implements OnInit {

  @ViewChild('titleInput') inputElement: ElementRef
  @Input() projectData: ProjectTitle
  @Input() maxLength: number
  @Input() placeholder: string
  @Output() titleBlur = new EventEmitter()
  @Output() checkEditTitle = new EventEmitter()
  tempTitle: string
  showInputfield = true
  bsModalRef: BsModalRef

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
    if (this.projectData?.title) {
      this.tempTitle = this.projectData?.title
      this.showInputfield = false
    }
  }

  // Function to show or hide the input text field.
  toggleInputfield(): void {
    this.showInputfield = true
    setTimeout(() => this.inputElement.nativeElement.focus(), 0)
  }

  // Function to handle blur event of input field.
  handleBlur(value: string): void {
    this.tempTitle = value.trim()
    this.showInputfield = !this.tempTitle
    if ((this.tempTitle || this.projectData?.id)
      && (this.tempTitle !== this.projectData?.title)) { // check for same this.temptitle value
      this.titleBlur.emit({ title: this.tempTitle })
    }
  }

  getModal(): void {
    const initialState = { modalConfig: { ...ModalInput } }
    this.bsModalRef = this.modalService.show(ModalFormComponent, { class: 'modal-form', initialState })
    this.bsModalRef.content.closeBtnName = 'Close'
  }

}
