import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html',
  styleUrls: ['./validator.component.scss']
})
export class ValidatorComponent {

  @Input() value: number
  @Input() maxlength = 70
  constructor() { }

}
