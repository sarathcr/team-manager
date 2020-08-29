import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { Option } from 'src/app/shared/constants/model/form-elements.model'
import { EditableListVariant } from '../../constants/model/editable-list.model'

@Component({
  selector: 'app-editable-list',
  templateUrl: './editable-list.component.html',
  styleUrls: ['./editable-list.component.scss'],
})
export class EditableListComponent {
  @Input() list: Option[]
  @Input() maxLength = 150
  @Input() variant: EditableListVariant = 'default'
  @Input() isNumbered = false
  @Input() editModalTitle: string
  @Input() editModalLabel: string
  @Input() editModalbuttonLabel: string
  @Input() deleteModalTitle: string
  @Input() deleteModalDescription: string
  @Input() deleteModalbuttonLabel: string
  @Input() helperText: string
  @Input() textareaPlaceholder: string
  @Input() errorText: string
  @Input() textareaVariant: string
  @Input() lineLimit: number
  @Input() optionalButtonLabel: string
  @Input() isTextareaActive: boolean
  @Input() initFocus: boolean
  @Input() optionalPlaceholder: string
  @Input() optionalTitle: string
  @Input() customTextareaClass: string
  @Output() textareaActive = new EventEmitter()
  @Output() editItem = new EventEmitter()
  @Output() deleteItem = new EventEmitter()
  @Output() addItem = new EventEmitter()
  @ViewChild('deleteModal') deleteModal: TemplateRef<any>
  @ViewChild('editModal') editModal: TemplateRef<any>
  modalRef: BsModalRef
  editIndex: number
  deleteIndex: number
  editString: string

  constructor(private modalService: BsModalService) {}

  openDeleteModal(index: number): void {
    this.deleteIndex = index
    this.modalRef = this.modalService.show(this.deleteModal, {
      class: 'common-modal  modal-dialog-centered',
    })
  }

  declineDeleteModal(): void {
    this.modalRef.hide()
  }

  confirmDeleteModal(): void {
    this.list.splice(this.deleteIndex, 1)
    this.deleteItem.emit([...this.list])
    this.modalRef.hide()
  }

  openEditModal(name: string, index: number): void {
    this.editIndex = index
    this.editString = name
    this.modalRef = this.modalService.show(this.editModal, {
      ignoreBackdropClick: true,
      class: 'modal-form modal-dialog-centered',
    })
  }

  declineEditModal(): void {
    this.modalRef.hide()
  }

  confirmEditModal(data: string): void {
    this.list[this.editIndex].name = data
    this.editItem.emit([...this.list])
    this.modalRef.hide()
  }

  onAddItem(data: Option): void {
    this.list.push(data)
    this.addItem.emit([...this.list])
  }

  toggleOptionalContent(): void {
    this.initFocus = true
    this.textareaActive.emit()
  }
}
