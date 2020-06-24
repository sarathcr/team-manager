import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { ModalComponent } from '../modal/modal.component'
import { Subject, Project } from 'src/app/modules/project-editor/constants/project.model'

@Component({
  selector: 'app-details-selector',
  templateUrl: './details-selector.component.html',
  styleUrls: ['./details-selector.component.scss']
})
export class DetailsSelectorComponent implements OnInit {

  showList = false
  @Input() data: Subject
  @Input() criterias: any[]
  @Input() subjectId: number
  @Input() i: number
  @Input() isLast = false
  @Input() project$: Observable<Project>
  @Output() addCriteria = new EventEmitter()
  @Output() openModal = new EventEmitter()
  @Output() deleteCriteria = new EventEmitter()
  count = 0
  bsModalRef: BsModalRef

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
    this.formInit()
  }

  formInit(): void {
    this.project$
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
        this.count = this.criterias.filter(criteria => criteria === this.subjectId).length
      }
    })
  }

  addItem(id: number, init = false): void {
    this.addCriteria.emit({ id, init })
    this.openModal.emit()
    this.getCount()
  }

  getCount(): void {
    this.count = this.criterias.filter(criteria => criteria === this.subjectId).length
  }
}
