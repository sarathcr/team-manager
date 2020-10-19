import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { EditorService } from 'src/app/modules/teacher/project-editor/services/editor/editor.service'

@Component({
  selector: 'app-sticky-footer',
  templateUrl: './sticky-footer.component.html',
  styleUrls: ['./sticky-footer.component.scss'],
})
export class StickyFooterComponent implements OnInit {
  @Input() totalCount = 0
  @Output() delete: EventEmitter<any> = new EventEmitter()
  modalRef: BsModalRef
  @ViewChild('modalDelete') modalDelete: TemplateRef<any>
  localExperienceType: number
  constructor(
    private modalService: BsModalService,
    private editor: EditorService
  ) {}
  ngOnInit(): void {
    this.localExperienceType = this.editor.getLocalExperienceType()
  }
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
