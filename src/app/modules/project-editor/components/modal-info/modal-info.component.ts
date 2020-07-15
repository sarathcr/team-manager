import { Component, ViewEncapsulation, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { PlatformLocation } from '@angular/common'

import { ModalInfoVariant } from './../../constants/model/modal-info.model'
@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalInfoComponent implements OnInit {
  @Input() variant: ModalInfoVariant
  @Input() title: string
  @Input() description: string
  @Input() confirmLabel: string
  @Input() cancelLabel = 'PROJECT.project_button_cancel'
  @Output() decline = new EventEmitter()
  @Output() confirm = new EventEmitter()

  constructor(private location: PlatformLocation) {
    // closes modal when back button is clicked
    this.location.onPopState(() => this.onDecline())
  }

  ngOnInit(): void {}

  onDecline(): void {
    this.decline.emit()
  }

  onConfirm(): void {
    this.confirm.emit()
  }
}
