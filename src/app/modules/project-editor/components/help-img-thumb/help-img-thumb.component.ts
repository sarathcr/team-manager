import { Component, OnInit, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HelpModalContentComponent } from '../help-modal-content/help-modal-content.component';

@Component({
  selector: 'app-help-img-thumb',
  templateUrl: './help-img-thumb.component.html',
  styleUrls: ['./help-img-thumb.component.scss']
})
export class HelpImgThumbComponent implements OnInit {
  bsModalRef: BsModalRef;
  @Input() title: string;
  @Input() thumbImg: string;
  @Input() content: string;

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  //Open Modal
  openModalWithComponent() {
    const initialState = {
      title: this.title,
      img: this.content
    };

    this.bsModalRef = this.modalService.show(HelpModalContentComponent, { class: 'help-modal', initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
