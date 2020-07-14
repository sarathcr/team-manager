import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { Subject, Project } from 'src/app/modules/project-editor/constants/model/project.model'
import { ButtonIcon } from 'src/app/shared/constants/model/form-elements.model'

import { SubSink } from 'src/app/shared/utility/subsink.utility'

@Component({
  selector: 'app-details-selector',
  templateUrl: './details-selector.component.html',
  styleUrls: ['./details-selector.component.scss']
})
export class DetailsSelectorComponent implements OnInit, OnDestroy {

  showList = false
  @Input() subjectItem: any[]
  @Input() subject: Subject
  @Input() isLast = false
  @Input() variant: string
  @Input() loading = false
  @Input() project$: Observable<Project>
  @Input() unselectedLabel: string
  @Input() selectedLabel: string
  @Output() addCriteria: EventEmitter<any> = new EventEmitter()
  @Output() add: EventEmitter<any> = new EventEmitter()
  @Output() deleteById: EventEmitter<any> = new EventEmitter()
  count = 0
  icon: ButtonIcon
  subscriptions = new SubSink()
  constructor() { }

  ngOnInit(): void {
    this.formInit()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  formInit(): void {
    this.subscriptions.sink = this.project$
      .pipe(map(data => data?.evaluationCriteria))
      .subscribe(subjectItem => {
        if (subjectItem) {
          subjectItem.forEach(criteria => {
            if (this.subject.id === criteria.subjectId) {
              this.getCount()
            }
          })
        }
      })
    this.icon = this.variant as ButtonIcon
  }

  onDeleteById(id: number): void{
    this.deleteById.emit({ subjectId: this.subject.id, id })
  }

  addItem(): void {
    this.add.emit(this.subject)
    this.getCount()
  }

  getCount(): void {
    this.count = this.subjectItem.filter(criteria => criteria === this.subject.id).length
  }
}
