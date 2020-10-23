import { Component, EventEmitter, Input, Output } from '@angular/core'

import { DropdownElement } from '../../../../../../../common-shared/constants/model/form-elements.model'
import {
  DropdownItem,
} from '../../../activity/constants/model/draggable-row.model'

@Component({
  selector: 'app-evaluation-card',
  templateUrl: './evaluation-card.component.html',
  styleUrls: ['./evaluation-card.component.scss'],
})
export class EvaluationCardComponent {
  @Input() title: string
  @Input() percentage: number
  @Input() infoPercentage: string
  @Input() id: number
  @Input() isExercise: false
  @Input() isNotClasificable: false
  @Input() tooltipText: string
  @Input() dropdownElements: DropdownElement[] = [
    {
      icon: 'icon-ic_view_small',
      text: 'Ver actividad',
      action: 'update',
    },
  ]
  @Input() hasHeader: false

  @Output() actionEmited: EventEmitter<any> = new EventEmitter()

  actionEmit(elementSelected: DropdownItem): void {
    this.actionEmited.emit( this.id )
  }
}
