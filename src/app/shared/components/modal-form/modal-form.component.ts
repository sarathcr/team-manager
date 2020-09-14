import { PlatformLocation } from '@angular/common'
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core'
import { Status } from '../../../modules/project-editor/constants/model/project.model'
import {
  FieldEvent,
  InputInnerLabel,
  InputVariant,
} from '../../constants/model/form-elements.model'
import { ModalFormVariant } from '../../constants/model/modal-form.model'

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalFormComponent implements OnInit {
  @Input() variant: ModalFormVariant = 'input'
  @Input() title: string
  @Input() confirmLabel = 'PROJECT.project_button_create'
  @Input() data: string
  @Input() label: string
  @Input() innerLabel: InputInnerLabel
  @Input() helperText: string
  @Input() errorText: string
  @Input() maxLength: number
  @Input() enableValidator = true
  @Input() inputVariant: InputVariant = 'text'
  @Input() placeholder = ''
  @Input() description = ''
  @Input() titleVariant: 'primary' | 'secondary' = 'primary'
  @Input() buttonDisabled = true
  @Input() error = false
  @Output() decline = new EventEmitter()
  @Output() confirm = new EventEmitter()
  @Output() getInputValue = new EventEmitter()
  status: Status

  constructor(private location: PlatformLocation) {
    // closes modal when back button is clicked
    this.location.onPopState(() => this.onDecline())
  }

  ngOnInit(): void {
    this.checkStatus(this.data)
  }

  checkStatus(value: string): void {
    if (this.variant === 'input' && this.inputVariant !== 'number') {
      this.buttonDisabled = !value?.length
      this.data = value
    }
  }

  onDecline(): void {
    this.decline.emit()
  }

  onConfirm(): void {
    this.confirm.emit(this.data)
  }

  onValueChange($event: any): void {
    this.checkStatus($event)
    this.getInputValue.emit($event)
  }

  onTextareaValueChange($event: FieldEvent): void {
    this.buttonDisabled = $event.status === 'PENDING'
    this.data = $event.value
  }
}
