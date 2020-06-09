import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalContentComponent implements OnInit {
  title: string
  img: string
  video: boolean
  externalVideo: boolean
  externalVideoSources: any
  internalVideoSoiurces: any
  closeBtnName: string

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }
}
