import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { PeopleRole, PeopleStatus } from '../../constants/model/box-row.model'

@Component({
  selector: 'app-box-row',
  templateUrl: './box-row.component.html',
  styleUrls: ['./box-row.component.scss'],
})
export class BoxRowComponent {
  @Input() isHead = false
  @Input() hasClose = false
  @Input() role: PeopleRole
  @Input() status: PeopleStatus
  @Output() delete: EventEmitter<any> = new EventEmitter()
  modalRef: BsModalRef
  @Input() experienceType: number
  @ViewChild('modalDelete') modalDelete: TemplateRef<any>

  constructor(private modalService: BsModalService) {}
  deleteItem(event: any): void {
    this.delete.emit(event)
    this.modalRef?.hide()
  }
  confirmModal(data: object): void {
    this.modalRef = this.modalService.show(this.modalDelete, {
      class: 'common-modal  modal-dialog-centered',
    })
  }

  declineModal(): void {
    this.modalRef?.hide()
  }
}
