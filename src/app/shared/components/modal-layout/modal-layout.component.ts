import { PlatformLocation } from '@angular/common'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-modal-layout',
  templateUrl: './modal-layout.component.html',
  styleUrls: ['./modal-layout.component.scss'],
})
export class ModalLayoutComponent implements OnInit {
  @Input() hasClose = true
  @Input() backLabel
  @Input() titleLighten = false
  @Input() modalTitle: string
  @Input() confirmLabel: string
  @Input() isDisabled = false

  @Output() confirm = new EventEmitter()
  @Output() decline = new EventEmitter()
  @Output() backClick = new EventEmitter()

  constructor(private location: PlatformLocation) {
    // closes modal when back button is clicked
    this.location.onPopState(() => this.onDecline())
  }

  ngOnInit(): void {}

  onDecline(): void {
    this.decline.emit('close')
  }

  onConfirm(): void {
    this.confirm.emit('confirmed')
  }

  onBackClick(): void {
    this.backClick.emit('back')
  }
}
