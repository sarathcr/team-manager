import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter
} from '@angular/core'
import { PlatformLocation } from '@angular/common'
import { Status } from 'src/app/modules/project-editor/constants/model/project.model'
import { FieldEvent } from '../../constants/model/form-elements.model'
import { ModalFormVariant } from '../../constants/model/modal-form.model'

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalFormComponent implements OnInit {
  @Input() variant: ModalFormVariant = 'input'
  @Input() title: string
  @Input() confirmLabel = 'PROJECT.project_button_create'
  @Input() data: string
  @Input() label: string
  @Input() helperText: string
  @Input() errorText: string
  @Input() maxLength: number
  @Output() decline = new EventEmitter()
  @Output() confirm = new EventEmitter()
  status: Status

  constructor(private location: PlatformLocation) {
    // closes modal when back button is clicked
    this.location.onPopState(() => this.onDecline())
  }

  ngOnInit(): void {
    this.checkStatus(this.data)
  }

  checkStatus(value: string): void {
    if (this.variant === 'input') {
      this.status = value?.length ? 'INPROCESS' : 'PENDING'
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
  }

  onTextareaValueChange($event: FieldEvent): void {
    this.status = $event.status
    this.data = $event.value
  }
}
