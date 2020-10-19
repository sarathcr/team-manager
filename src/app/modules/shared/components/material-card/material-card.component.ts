import { Component, EventEmitter, Input, Output } from '@angular/core'
import { entityType } from 'src/app/modules/teacher/project-editor/constants/model/activity.model'
import {
  sizeVariant,
  typeVariant,
} from '../../constants/model/material-card.model'

@Component({
  selector: 'app-material-card',
  templateUrl: './material-card.component.html',
  styleUrls: ['./material-card.component.scss'],
})
export class MaterialCardComponent {
  @Input() link = ''
  @Input() thumbnail = ''
  @Input() label = ''
  @Input() title = ''
  @Input() loading = false
  @Input() variant: typeVariant = 'VIDEO'
  @Input() sourceType: string
  @Input() entityType: entityType
  @Input() size: sizeVariant
  @Input() showSwitch = true
  @Input() switchOn = false
  @Input() canDelete = true
  @Input() draggable = false
  @Input() validPreviewLink = true
  @Input() customClass = ''
  @Input() enableShadow = true
  @Input() enableBorder = false
  @Input() displayFiletype = false
  @Output() delete: EventEmitter<any> = new EventEmitter()
  @Output() dragg: EventEmitter<any> = new EventEmitter()
  @Output() switch: EventEmitter<boolean> = new EventEmitter()
  imageError = false

  constructor() {}

  onDragg($event: any): void {
    this.dragg.emit()
  }

  onDelete(): void {
    this.delete.emit()
  }

  onSwitch($event: boolean): void {
    this.switch.emit($event)
  }
}
