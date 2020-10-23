import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Type } from '../../constants/model/switch.model'

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
})
export class SwitchComponent implements OnInit {
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

  ngOnInit(): void {
    if (this.type === 'button') {
      this.isActive = this.switchOn ? 'item1' : 'item2'
    }
  }

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
