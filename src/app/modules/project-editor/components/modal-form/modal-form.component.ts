import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core'
import { ProjectTitle, Status } from '../../constants/model/project.model'
import { ModalFormVariant } from '../../constants/modal-form-config.model'

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalFormComponent implements OnInit {

  @Input() projectData: ProjectTitle
  @Input() variant: ModalFormVariant
  @Input() title: string
  @Input() confirmLabel = 'PROJECT.project_button_create'
  @Input() data: string
  @Output() decline = new EventEmitter()
  @Output() confirm = new EventEmitter()
  status: Status

  constructor() {}

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

}
