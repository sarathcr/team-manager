import { PlatformLocation } from '@angular/common'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { ButtonSize, ButtonVariants } from '../../constants/model/form-elements.model'

@Component({
  selector: 'app-modal-layout',
  templateUrl: './modal-layout.component.html',
  styleUrls: ['./modal-layout.component.scss'],
})
export class ModalLayoutComponent implements OnInit {
  @Input() hasClose = true
  @Input() backLabel
  @Input() titleLighten = false
  @Input() titleSecondary = false
  @Input() modalTitle: string
  @Input() customClass: string
  @Input() confirmLabel: string
  @Input() isDisabled = false
  @Input() buttonSize: ButtonSize = 'default'
  @Input() buttonVariant: ButtonVariants = 'contained'
  @Input() loading = false

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
