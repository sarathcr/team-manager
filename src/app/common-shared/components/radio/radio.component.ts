import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent implements OnInit {
  @Input() data: any
  @Input() checked = false
  @Output() changed = new EventEmitter()

  constructor() {}

  ngOnInit(): void {}

  onChanged(event: any): void {
    this.changed.emit(event.target.checked)
  }
}
