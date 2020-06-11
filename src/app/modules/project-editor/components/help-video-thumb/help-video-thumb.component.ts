import { Component, OnInit, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HelpModalContentComponent } from '../help-modal-content/help-modal-content.component';

@Component({
  selector: 'app-help-video-thumb',
  templateUrl: './help-video-thumb.component.html',
  styleUrls: ['./help-video-thumb.component.scss']
})
export class HelpVideoThumbComponent implements OnInit {
  @Input() poster: string;
  @Input() title: string;
  @Input() type: string;
  @Input() url: string;

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  videoModal() {
    const initialState = {
      title: this.title, // Title goes here
      video: true,
      videoSources: {
        src: this.url, //'https://youtu.be/f4cstWWgOh0', // 'https://vimeo.com/347119375', // Set video url here
        type: this.type, //'video/youtube' 'video/vimeo' 'video/mp4' Set video type here
      }
    };

    this.bsModalRef = this.modalService.show(HelpModalContentComponent, { class: 'help-modal', initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
