import { Component, EventEmitter, Input, Output } from '@angular/core'
import {
  IconVariant,
  PresentationCardvariant,
} from '../../constants/model/presentation-card.model'

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
  @Input() delete = false
  @Input() id: number
  @Input() link = ''
  @Input() iconVariant: IconVariant
  @Output() cardSelect = new EventEmitter()
  @Output() cardDelete = new EventEmitter()

  constructor() {}

  onCardSelect(): void {
    if (this.link) {
      window.open(this.link)
    } else {
      this.cardSelect.emit()
    }
  }
  onCardDelete($event: any): void {
    this.cardDelete.emit(this.id)
    $event.stopPropagation()
  }
}
