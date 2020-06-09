import { Component, OnInit, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalContentComponent } from '../modal-content/modal-content.component';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  @Input() details: object;
  bsModalRef: BsModalRef;

  videoSources: Plyr.Source[] = [
    {
      src: 'bTqVqk7FSmY',
      provider: 'youtube',
    },
  ];

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  videoModal() {
    const initialState = {
      title: '',
      video: true,
      externalVideo: true,
      externalVideoSources: [
        {
          src: 'bTqVqk7FSmY',
          provider: 'youtube',
        }
      ],
      internalVideoSoiurces: [

      ]
    };

    this.bsModalRef = this.modalService.show(ModalContentComponent, { class: 'app-modal', initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
