import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Type } from '../../constants/model/switch.model'

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
})
export class SwitchComponent {
  @Input() switchOn = true
  @Input() disabled = false
  @Input() textOn = 'On'
  @Input() textOff = 'Off'
  @Input() type: Type = 'default'
  @Input() iconOne: string
  @Input() iconTwo: string
  @Input() buttonTextOne: string
  @Input() buttonTextTwo: string
  isActive = 'item1'

  @Output() changeSwitch: EventEmitter<boolean> = new EventEmitter()

  constructor() {}

  toggleSwitch($event: any): void {
    if (!this.disabled) {
      if (this.type === 'button') {
        this.changeSwitch.emit(this.isActive === 'item1' ? true : false)
      } else {
        this.switchOn = !this.switchOn
        this.changeSwitch.emit(this.switchOn)
      }
    }
  }
}
