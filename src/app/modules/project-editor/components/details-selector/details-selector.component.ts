import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core'

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { ModalComponent } from '../modal/modal.component'
import { Subject, Project } from 'src/app/modules/project-editor/constants/project.model'
import { SubSink } from 'src/app/shared/utility/subsink.utility'
import { PrincipalViewComponent } from '../principal-view/principal-view.component'

@Component({
  selector: 'app-details-selector',
  templateUrl: './details-selector.component.html',
  styleUrls: ['./details-selector.component.scss']
})
export class DetailsSelectorComponent implements OnInit, OnDestroy {

  showList = false
  @Input() data: Subject
  @Input() criterias: any[]
  @Input() subject: Subject
  @Input() i: number
  @Input() isLast = false
  @Input() project$: Observable<Project>
  @Output() addCriteria: EventEmitter<any> = new EventEmitter()
  @Output() openModal: EventEmitter<any> = new EventEmitter()
  @Output() deleteCriteria: EventEmitter<any> = new EventEmitter()
  count = 0
  bsModalRef: BsModalRef
  subscriptions = new SubSink()

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
      .subscribe(criterias => {
        if (criterias) {
          criterias.forEach(criteria => {
            if (this.data.id === criteria.subjectId) {
              this.getCount()
            }
          })
        }
      })
  }

  getModal(criteriaIndex: number): void {
    this.bsModalRef = this.modalService.show(ModalComponent, { class: 'common-modal' })
    this.bsModalRef.content.closeBtnName = 'Close'
    this.bsModalRef.content.onClose.subscribe(result => {
      if (result === 'delete') {
        this.deleteCriteria.emit(criteriaIndex)
        this.count = this.criterias.filter(criteria => criteria === this.subject.id).length
      }
    })
  }

  addItem(id: number, init: boolean = false): void {
    // this.addCriteria.emit({ id, init })
    // this.openModalWithComponent()
    this.openModal.emit(this.subject)
    this.getCount()
  }

  getCount(): void {
    this.count = this.criterias.filter(criteria => criteria === this.subject.id).length
  }
}
