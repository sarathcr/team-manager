import { Component, Input } from '@angular/core'

import { ErrorType } from 'src/app/common-shared/constants/model/form-elements.model'

@Component({
  selector: 'app-error-toast',
  templateUrl: './error-toast.component.html',
  styleUrls: ['./error-toast.component.scss'],
})
export class ErrorToastComponent {
  @Input() type: ErrorType = 'danger'
  @Input() dissmissble = false
  @Input() timeout: number
  @Input() maxLimit = 3
  @Input() errors = []

  constructor() {}

  handleClose(index: number): void {
    this.errors.splice(index, 1)
  }
}
