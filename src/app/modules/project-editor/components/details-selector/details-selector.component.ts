import { Component, OnInit, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../modal/modal.component';
import { Subject } from 'src/app/modules/project-editor/constants/project.model';

@Component({
  selector: 'app-details-selector',
  templateUrl: './details-selector.component.html',
  styleUrls: ['./details-selector.component.scss']
})
export class DetailsSelectorComponent implements OnInit {
  showList: boolean = false
  @Input() data: Subject;
  @Input() isLast: boolean = false
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  getModal() {
    this.bsModalRef = this.modalService.show(ModalComponent, { class: 'common-modal'});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
