import { PlatformLocation } from '@angular/common'
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core'

import {
  ModalInfoAppearance,
  ModalInfoTheme,
  ModalInfoVariant,
} from '../../constants/model/modal-info.model'
@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalInfoComponent implements OnInit {
  @Input() variant: ModalInfoVariant = 'confirmation'
  @Input() appearance: ModalInfoAppearance = 'default'
  @Input() modalTitle: string
  @Input() overTitle: string
  @Input() description: string
  @Input() confirmLabel: string
  @Input() theme: ModalInfoTheme = 'primary'
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
