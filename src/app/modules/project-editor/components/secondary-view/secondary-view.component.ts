import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Block } from 'src/app/shared/constants/block.model'
import { CompetencyModal } from '../../constants/competency-modal.data'
import { PrincipalModalColData, TranslatePrincipalData } from '../../constants/modal-table.data'

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
