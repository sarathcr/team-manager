import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, TemplateRef, ViewChild } from '@angular/core'

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { Subject, Project } from 'src/app/modules/project-editor/constants/model/project.model'
import { ButtonIcon } from 'src/app/shared/constants/model/form-config.model'

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
  @Input() icon: ButtonIcon
  @Input() loading = false
  @Input() project$: Observable<Project>
  @Input() placeholder: string
  @Output() addCriteria: EventEmitter<any> = new EventEmitter()
  @Output() openModal: EventEmitter<any> = new EventEmitter()
  @Output() deleteCriteria: EventEmitter<any> = new EventEmitter()
  @ViewChild('infoModal') infoModal: TemplateRef<any>
  count = 0
  bsModalRef: BsModalRef
  subscriptions = new SubSink()
  id = 0
  constructor(private modalService: BsModalService) { }

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
  }

  getModal(id: number): void {
    this.id = id
    this.bsModalRef = this.modalService.show(this.infoModal, {
      class: 'common-modal'
    })
  }

  declineModal(): void {
    this.bsModalRef.hide()
  }

  confirmModal(): void {
    this.deleteCriteria.emit({ subjectId: this.subject.id, id: this.id })
    this.count = this.subjectItem.filter(criteria => criteria === this.subject.id).length
    this.bsModalRef.hide()
  }

  addItem(): void {
    this.openModal.emit(this.subject)
    this.getCount()
  }

  getCount(): void {
    this.count = this.subjectItem.filter(criteria => criteria === this.subject.id).length
  }
}
