import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { BsModalRef } from 'ngx-bootstrap/modal'
import { VideoOptions } from 'src/app/shared/constants/video.model'

@Component({
  selector: 'app-help-modal',
  templateUrl: './help-modal-content.component.html',
  styleUrls: ['./help-modal-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HelpModalContentComponent implements OnInit {
  title: string
  img: string
  video: boolean
  pdf = false
  pdfContent: string
  videoSources: any
  closeBtnName: string
  videoOptions: VideoOptions
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {
    this.videoInit()
  }

  videoInit(): void{
    if (this.video){
      this.videoOptions = {
        fluid: true,
        autoplay: true,
        controls: true,
        techOrder: ['html5', 'youtube', 'vimeo'],
        sources: [{
          src: this.videoSources.src,
          type: this.videoSources.type,
        }],
        aspectRatio: '16:9',
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
