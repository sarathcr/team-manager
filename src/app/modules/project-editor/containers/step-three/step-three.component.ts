import { CompetencyModalContentComponent } from './../../components/competency-modal-content/competency-modal-content.component';
import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss']
})
export class StepThreeComponent implements OnInit {
  bsModalRef: BsModalRef

  constructor( private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  openModalWithComponent(event) {
    const initialState = {
     
    };

    this.bsModalRef = this.modalService.show(CompetencyModalContentComponent, { class: 'competency-modal', initialState })
    this.bsModalRef.content.closeBtnName = 'Close'
  }

  ngOnDestroy() {
    const modalCount = this.modalService.getModalsCount();
    if (modalCount > 0) {
      this.modalService._hideModal(modalCount)
    }
  }

}
