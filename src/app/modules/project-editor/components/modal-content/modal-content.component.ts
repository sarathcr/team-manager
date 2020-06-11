import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { VideoOptions } from 'src/app/shared/constants/video.model';

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
  videoSources: any
  closeBtnName: string
  videoOptions: VideoOptions
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
    this.videoInit()
  }

  videoInit(){
    if(this.video){
      this.videoOptions = {
        fluid: true,
        autoplay: true,
        controls: true,
        techOrder: ["html5","youtube","vimeo"],
        sources: [{
          src: this.videoSources.src,
          type: "video/"+this.videoSources.type,
        }],
        aspectRatio: "16:9",
        muted: false,
        youtube: {
          iv_load_policy: 3,
          ytRel: 0,
          ytControls: 0
        }
      }
    }
  }
}
