import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ProfileCardVariant } from '../../constants/model/profile-card.model'

@Component({
  selector: 'app-people-card',
  templateUrl: './people-card.component.html',
  styleUrls: ['./people-card.component.scss'],
})
export class PeopleCardComponent {
  @Input() imageUrl: string
  @Input() profileName: string
  @Input() profileType: string
  @Input() inviteLabel: string
  @Input() variant: ProfileCardVariant = 'default'
  @Input() checked: boolean
  @Output() cardSelect = new EventEmitter()
  constructor() {}

  onSelect(): void {
    this.cardSelect.emit()
  }
}
