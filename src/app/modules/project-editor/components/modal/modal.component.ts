import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core'
import { PlatformLocation } from '@angular/common'
import { BsModalRef } from 'ngx-bootstrap/modal'

import { Subject } from 'rxjs'

import { FieldConfig } from 'src/app/shared/constants/model/form-config.model'
import { ModalConfig } from '../../constants/model/modal-info.model'

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
    private location: PlatformLocation
  ) {
    // closes modal when back button is clicked
    this.location.onPopState(() => this.bsModalRef.hide())
  }

  ngOnInit(): void {
    this.onClose = new Subject()
  }

  public onConfirm(): void {
    this.onClose.next(this.modalConfig.variant)
    this.bsModalRef.hide()
  }

  public onCancel(): void {
    this.onClose.next('cancel')
    this.bsModalRef.hide()
  }
}
