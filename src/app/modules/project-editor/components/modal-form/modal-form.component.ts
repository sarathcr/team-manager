import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core'
import { ModalFormConfig } from '../../constants/modal-form-config.model'
import { BsModalRef } from 'ngx-bootstrap/modal'
import { PlatformLocation } from '@angular/common'
import { Subject } from 'rxjs'
import { ButtonSubmitConfig } from '../../constants/form-config.data'

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalFormComponent implements OnInit {

  @Input() modalConfig: ModalFormConfig

  public onClose: Subject<string>
  constructor(
    public bsModalRef: BsModalRef,
    private location: PlatformLocation
  ) {
    this.location.onPopState(() => this.bsModalRef.hide())
  }

  ngOnInit(): void {
    this.onClose = new Subject()
  }

  public onConfirm(): void {
    this.onClose.next(this.modalConfig.variant)
    this.bsModalRef.hide()
  }

}
