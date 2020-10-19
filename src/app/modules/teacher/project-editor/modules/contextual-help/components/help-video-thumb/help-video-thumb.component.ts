import { Component, Input, OnDestroy } from '@angular/core'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { HelpModalContentComponent } from '../help-modal-content/help-modal-content.component'

@Component({
  selector: 'app-help-video-thumb',
  templateUrl: './help-video-thumb.component.html',
  styleUrls: ['./help-video-thumb.component.scss'],
})
export class HelpVideoThumbComponent implements OnDestroy {
  @Input() poster: string
  @Input() title: string
  @Input() type: string
  @Input() url: string

  bsModalRef: BsModalRef

  constructor(private modalService: BsModalService) {}

  videoModal(): void {
    const initialState = {
      title: this.title, // Title goes here
      video: true,
      videoSources: {
        src: this.url, // 'https://youtu.be/f4cstWWgOh0', // 'https://vimeo.com/347119375', // Set video url here
        type: this.type, // 'video/youtube' 'video/vimeo' 'video/mp4' Set video type here
      },
    }

    this.bsModalRef = this.modalService.show(HelpModalContentComponent, {
      class: 'help-modal modal-dialog-centered',
      initialState,
    })
    this.bsModalRef.content.closeBtnName = 'Close'
  }

  ngOnDestroy(): void {
    const modalCount = this.modalService.getModalsCount()
    if (modalCount > 0) {
      this.modalService._hideModal(modalCount)
    }
  }
}
