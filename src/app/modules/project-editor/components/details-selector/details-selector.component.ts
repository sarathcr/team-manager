import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../modal/modal.component';
import { Subject } from '../../../../shared/constants/subject.model';
import { Observable } from 'rxjs';
import { EvaluationCriteria } from 'src/app/shared/constants/project.model';

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
  @Input() criteria$: Observable<EvaluationCriteria[]>
  @Output() onAdd = new EventEmitter()
  @Output() onDelete = new EventEmitter()
  count: number = 0
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
    this.formInit()
  }

  formInit() {
    this.criteria$.subscribe(criterias => {
      if (criterias) {
        criterias.forEach(criteria => {
          if (this.data.id === criteria.subjectId)
            this.addItem(criteria.subjectId, true)
        })
      }
    })
  }

  getModal(i) {
    this.bsModalRef = this.modalService.show(ModalComponent, { class: 'common-modal' });
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.onClose.subscribe(result => {
      if (result === 'delete') {
        this.onDelete.emit(i)
        this.count = this.criterias.filter(d => d == this.i).length
      }
    })
  }

  addItem(id: number, init = false) {
    this.onAdd.emit({ id, init })
    this.count = this.criterias.filter(d => d == this.i).length
  }

}
