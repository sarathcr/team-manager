import { Component, EventEmitter, Input, Output } from '@angular/core'
import { PresentationCardvariant } from '../../constants/model/presentation-card.model'

@Component({
  selector: 'app-presentation-card',
  templateUrl: './presentation-card.component.html',
  styleUrls: ['./presentation-card.component.scss'],
})
export class PresentationCardComponent {
  @Input() variant: PresentationCardvariant = 'default'
  @Input() imageURL: string
  @Input() title: string
  @Input() premiumLabel = 'PREMIUM'
  @Input() isPremium = false
  @Input() isComingSoon = false
  @Input() description: string
  @Input() loading = false
  @Input() disabled = false
  @Output() cardSelect = new EventEmitter()

  constructor() {}

  onCardSelect(): void {
    this.cardSelect.emit()
  }
}
