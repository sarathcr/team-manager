import { Component } from '@angular/core'

@Component({
  selector: 'app-activation-error',
  templateUrl: './activation-error.component.html',
  styleUrls: ['./activation-error.component.scss']
})
export class ActivationErrorComponent {
  show = false
  constructor() { }

  showExpiredContent(): void{
    this.show = !this.show
  }
}
