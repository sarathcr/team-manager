import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  @Input() helperText: string
  @Input() value: number
  @Input() maxlength = 70
  constructor() { }

  ngOnInit(): void {
  }
}
