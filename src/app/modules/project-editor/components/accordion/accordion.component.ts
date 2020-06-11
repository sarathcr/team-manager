import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalContentComponent } from '../modal-content/modal-content.component';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccordionComponent implements OnInit {
  oneAtATime: boolean = true;
  isFirstOpen: boolean = true;
  customClass: string = 'accordion';
  bsModalRef: BsModalRef;

  link: object = {
    title: 'Los Objetivos de Desarrollo Sostenible y su vínculo con la educación.',
    img: '../../../../../assets/images/150.png',
    url: ''
  };

  video: object = {
    title: "Sample Video",
    type: 'youtube',
    url: 'https://youtu.be/f4cstWWgOh0',
    poster: '../../../../../assets/images/150.png'
  };

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  //Open Modal
  openModalWithComponent() {
    const initialState = {
      title: 'Modal with component',
      img: '../../../../../assets/images/150.png'
    };

    this.bsModalRef = this.modalService.show(ModalContentComponent, { class: 'app-modal', initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
