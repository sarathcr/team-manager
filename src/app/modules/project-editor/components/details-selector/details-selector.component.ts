import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
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
  @Output() onAdd = new EventEmitter()
  count: number = 0
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  getModal() {
    this.bsModalRef = this.modalService.show(ModalComponent, { class: 'common-modal'});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  addItem() {
    this.onAdd.emit(this.i)
    this.count = this.numbers.filter(d => d == this.i).length
  }

}
