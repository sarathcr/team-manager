import { Component, EventEmitter, Input, Output } from '@angular/core'

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

  @Output() changeSwitch: EventEmitter<boolean> = new EventEmitter()

  constructor() {}

  toggleSwitch($event: any): void {
    if (!this.disabled) {
      this.switchOn = !this.switchOn
      this.changeSwitch.emit(this.switchOn)
    }
  }
}
