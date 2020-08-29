import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core'

import { Subject } from 'src/app/modules/project-editor/constants/model/project.model'
import { ButtonIcon } from 'src/app/shared/constants/model/form-elements.model'

import { SubSink } from 'src/app/shared/utility/subsink.utility'

@Component({
  selector: 'app-details-selector',
  templateUrl: './details-selector.component.html',
  styleUrls: ['./details-selector.component.scss'],
})
export class DetailsSelectorComponent implements OnDestroy {
  showList = false
  @Input() subjectItem: any[]
  @Input() subject: Subject
  @Input() isLast = false
  @Input() variant: ButtonIcon
  @Input() loading = false
  @Input() unselectedLabel: string
  @Input() selectedLabel: string
  @Input() buttonLabel = 'OBJECTIVES.project_objectives_criteriawindow_add'
  @Input() simpleSelector = false
  @Input() optional = false
  @Input() label: string
  @Output() addCriteria: EventEmitter<any> = new EventEmitter()
  @Output() add: EventEmitter<any> = new EventEmitter()
  @Output() deleteById: EventEmitter<any> = new EventEmitter()
  count = 0
  subscriptions = new SubSink()
  constructor() {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  onDeleteById(id: number, index: number): void {
    if (!this.simpleSelector) {
      this.deleteById.emit({ subjectId: this.subject.id, id })
    } else {
      this.deleteById.emit({ id, type: this.subjectItem[index]?.type })
    }
  }

  addItem(): void {
    this.add.emit(this.subject)
  }
}
