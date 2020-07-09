import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core'

import { ModalInfoComponent } from '../modal-info/modal-info.component'

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { Subject, Project } from 'src/app/modules/project-editor/constants/model/project.model'
import { ButtonIcon } from 'src/app/shared/constants/model/form-config.model'

import { ModalDelete } from '../../constants/Data/modal-info.data'

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
    const initialState = { modalConfig: { ...ModalDelete } }
    this.bsModalRef = this.modalService.show(ModalInfoComponent, { class: 'common-modal', initialState })
    this.bsModalRef.content.closeBtnName = 'Close'
    this.bsModalRef.content.onClose.subscribe(result => {
      if (result === 'delete') {
        this.deleteCriteria.emit({ subjectId: this.subject.id, id })
        this.count = this.subjectItem.filter(criteria => criteria === this.subject.id).length
      }
    })
  }

  addItem(): void {
    this.openModal.emit(this.subject)
    this.getCount()
  }

  getCount(): void {
    this.count = this.subjectItem.filter(criteria => criteria === this.subject.id).length
  }
}
