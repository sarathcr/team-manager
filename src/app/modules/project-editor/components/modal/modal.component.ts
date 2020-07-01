import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core'
import { BsModalRef } from 'ngx-bootstrap/modal'

import { Subject } from 'rxjs'

import { EditorService } from '../../services/editor/editor.service'
import { FieldConfig, ModalConfig } from 'src/app/shared/constants/field.model'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {

  buttonConfig: FieldConfig
  textAreaConfig: FieldConfig
  @Input() modalConfig: ModalConfig

  public onClose: Subject<string>

  constructor(
    public bsModalRef: BsModalRef,
    private editor: EditorService
  ) { }

  ngOnInit(): void {
    this.onClose = new Subject()
  }

  public onConfirm(): void {
    this.onClose.next('delete')
    this.bsModalRef.hide()
  }

  public onCancel(): void {
    this.onClose.next('cancel')
    this.bsModalRef.hide()
  }

  public onRedirect(): void {
    this.editor.redirectToStep(this.modalConfig.redirectTo)
    this.bsModalRef.hide()
  }

}
