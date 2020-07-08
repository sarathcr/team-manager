import { Component, Input, Output, EventEmitter } from '@angular/core'

import { CompetencyModal } from '../../constants/model/principle-view.model'
import { Block } from '../../constants/model/curriculum.model'
import { PrincipalModalColData, TranslatePrincipalData } from '../../constants/model/principle-view.model'

@Component({
  selector: 'app-secondary-view',
  templateUrl: './secondary-view.component.html',
  styleUrls: ['./secondary-view.component.scss']
})
export class SecondaryViewComponent {

  @Input() blockData: Block[]
  @Input() heading: CompetencyModal
  @Input() modalColumns: PrincipalModalColData
  @Input() translateData: TranslatePrincipalData
  @Output() getPrimary: EventEmitter<null> = new EventEmitter()

  constructor() { }

  showPrimary(): void {
    this.getPrimary.emit(null)
  }

}
