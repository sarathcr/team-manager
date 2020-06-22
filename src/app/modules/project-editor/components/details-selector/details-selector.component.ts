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

  showList: boolean = false
  @Input() data: Subject
  @Input() criterias: any[]
  @Input() i: any
  @Input() isLast: boolean = false
  @Input() project$: Observable<Project>
  @Output() onAdd = new EventEmitter()
  @Output() openModal = new EventEmitter()
  @Output() onDelete = new EventEmitter()
  count: number = 0
  bsModalRef: BsModalRef

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
    this.formInit()
  }

  formInit() {
    this.project$
      .pipe(map(data => data?.evaluationCriteria))
      .subscribe(criterias => {
        if (criterias) {
          criterias.forEach(criteria => {
            if (this.data.id === criteria.subjectId)
              this.getCount()
          })
        }
      })
  }

  getModal(i) {
    this.bsModalRef = this.modalService.show(ModalComponent, { class: 'common-modal' })
    this.bsModalRef.content.closeBtnName = 'Close'
    this.bsModalRef.content.onClose.subscribe(result => {
      if (result === 'delete') {
        this.onDelete.emit(i)
        this.count = this.criterias.filter(d => d == this.i).length
      }
    })
  }

  addItem(id: number, init = false) {
    this.onAdd.emit({ id, init })
    this.openModal.emit()
    this.getCount()
  }

  getCount() {
    this.count = this.criterias.filter(d => d == this.i).length
  }
}
