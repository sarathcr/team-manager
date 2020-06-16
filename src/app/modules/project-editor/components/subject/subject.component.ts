import { Component, OnInit, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  @Input() title: string;
  @Input() content: string;
  bsModalRef: BsModalRef;
  
  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  getModal(){
    const initialState = {
      title: this.title, // Title goes here
    };

    this.bsModalRef = this.modalService.show(ModalComponent, { class: 'common-modal', initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
