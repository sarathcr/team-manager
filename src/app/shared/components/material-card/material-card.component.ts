import { Component, EventEmitter, Input, Output } from '@angular/core'
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
  @Input() variant: typeVariant = 'video'
  @Input() size: sizeVariant = 'medium'
  @Input() showSwitch = true
  @Input() switchOn = false
  @Input() canDelete = true
  @Input() draggable = false
  @Input() validPreviewLink = false

  @Output() delete: EventEmitter<any> = new EventEmitter()
  @Output() dragg: EventEmitter<any> = new EventEmitter()
  @Output() switch: EventEmitter<boolean> = new EventEmitter()

  constructor() {}

  onDragg($event: any): void {
    this.dragg.emit()
  }

  onDelete(): void {
    this.delete.emit()
  }

  onSwitch($event: boolean): void {
    this.switch.emit()
  }
}
