import { Component, OnInit, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalContentComponent } from '../modal-content/modal-content.component';

@Component({
  selector: 'app-video-thumb',
  templateUrl: './video-thumb.component.html',
  styleUrls: ['./video-thumb.component.scss']
})
export class VideoThumbComponent implements OnInit {
  @Input() details: object;
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  videoModal() {
    const initialState = {
      title: 'Some dummy title', // Title goes here
      video: true,
      videoSources: {
        src: 'https://youtu.be/f4cstWWgOh0', // 'https://vimeo.com/347119375', // Set video url here
        type: 'youtube' // 'vimeo', // Set video type here:- youtube,vimeo,html5,flash,mp4 etc
      }
    };

    this.bsModalRef = this.modalService.show(ModalContentComponent, { class: 'app-modal', initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
