import { PlatformLocation } from '@angular/common'
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { Status } from '../../../modules/teacher/project-editor/constants/model/project.model'
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
  @Input() minLength: number
  @Input() enableValidator = true
  @Input() inputVariant: InputVariant = 'text'
  @Input() placeholder = ''
  @Input() description = ''
  @Input() titleVariant: 'primary' | 'secondary' = 'primary'
  @Input() buttonDisabled = true
  @Input() buttonLoading = false
  @Input() error = false
  @Input() validatorVariant = 'counter'
  @Output() decline = new EventEmitter()
  @Output() confirm = new EventEmitter()
  @Output() getInputValue = new EventEmitter()
  status: Status
  modalForm

  constructor(
    private location: PlatformLocation,
    private formBuilder: FormBuilder
  ) {
    // closes modal when back button is clicked
    this.location.onPopState(() => this.onDecline())
  }

  ngOnInit(): void {
    this.modalForm = this.formBuilder.group({
      data: this.data || '',
    })
    this.checkStatus(this.data)
  }

  checkStatus(value: string): void {
    if (this.variant === 'input' && !this.minLength) {
      this.buttonDisabled = !value?.length
      this.data = value
    } else if (
      this.variant === 'input' &&
      this.minLength &&
      value?.length >= this.minLength
    ) {
      this.buttonDisabled = false
      this.data = value
    } else {
      this.buttonDisabled = true
    }
  }

  onDecline(): void {
    this.decline.emit()
  }

  onSubmit(customerData: any): void {
    this.confirm.emit(customerData.data)
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
