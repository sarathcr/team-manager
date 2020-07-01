import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core'
import { BsModalRef } from 'ngx-bootstrap/modal'

import { Subject } from 'rxjs'

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

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.onClose = new Subject()
    console.log(this.modalConfig)
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

  }

}
