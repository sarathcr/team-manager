import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  TemplateRef,
} from '@angular/core'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { Option } from 'src/app/shared/constants/model/form-elements.model'

@Component({
  selector: 'app-editable-list',
  templateUrl: './editable-list.component.html',
  styleUrls: ['./editable-list.component.scss'],
})
export class EditableListComponent implements OnInit {
  @Input() list: Option[]
  @Input() maxLength: number
  @Input() variant = 'default'
  @Input() editModalTitle: string
  @Input() editModalLabel: string
  @Input() editModalbuttonLabel: string
  @Input() deleteModalTitle: string
  @Input() deleteModalDescription: string
  @Input() deleteModalbuttonLabel: string
  @Input() helperText: string
  @Input() errorText: string
  @Output() editItem = new EventEmitter()
  @Output() deleteItem = new EventEmitter()
  @ViewChild('deleteModal') deleteModal: TemplateRef<any>
  @ViewChild('editModal') editModal: TemplateRef<any>
  modalRef: BsModalRef
  editIndex: number
  deleteIndex: number
  editString: string

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}

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
}
