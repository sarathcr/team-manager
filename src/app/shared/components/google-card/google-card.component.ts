import { Component, EventEmitter, Input, Output } from '@angular/core'
import { GoogleCardVariant } from '../../constants/model/google-card.model'

@Component({
  selector: 'app-google-card',
  templateUrl: './google-card.component.html',
  styleUrls: ['./google-card.component.scss'],
})
export class GoogleCardComponent {
  @Input() cardTitle: string
  @Input() cardSubtitle: string
  @Input() commingSoon = false
  @Input() variant: GoogleCardVariant
  @Output() openModal: EventEmitter<any> = new EventEmitter()

  constructor() {}

  onClick(): void {
    this.openModal.emit(this.variant)
  }
}
