import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../modal/modal.component';
import { Subject } from '../../../../shared/constants/subject.model';

@Component({
  selector: 'app-details-selector',
  templateUrl: './details-selector.component.html',
  styleUrls: ['./details-selector.component.scss']
})
export class DetailsSelectorComponent implements OnInit {

  showList: boolean = false
  @Input() data: Subject
  @Input() numbers: any[]
  @Input() i: any
  @Input() isLast: boolean = false
  @Output() onAdd = new EventEmitter()
  @Output() onDelete = new EventEmitter()
  count: number = 0
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  getModal(i) {
    this.bsModalRef = this.modalService.show(ModalComponent, { class: 'common-modal' });
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.onClose.subscribe(result => {
      if (result === 'delete') {
        this.onDelete.emit(i)
        this.count = this.numbers.filter(d => d == this.i).length
      }
    })
  }

  addItem() {
    this.onAdd.emit(this.i)
    this.count = this.numbers.filter(d => d == this.i).length
  }

}
