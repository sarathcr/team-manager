import { Component, Input, OnInit } from '@angular/core'
@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html',
  styleUrls: ['./validator.component.scss']
})
export class ValidatorComponent implements OnInit {

  @Input() value: string
  @Input() maxlength = 70
  @Input() isEnabled = true
  prevLength: number
  limitExceeds = false
  constructor() { }

  ngOnInit(): void {
    this.prevLength = this.value.length
  }

  valueChange($event: any): void {
    if (this.prevLength === $event.length && $event.length === +this.maxlength && this.isEnabled) {
      this.limitExceeds = true
    }
    else if (this.limitExceeds === true) {
      this.limitExceeds = false
    }
    this.prevLength = $event.length
  }

}
