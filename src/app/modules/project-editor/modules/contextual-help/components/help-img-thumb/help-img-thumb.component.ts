import { Component, Input, OnDestroy } from '@angular/core'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { HelpModalContentComponent } from '../help-modal-content/help-modal-content.component'

@Component({
  selector: 'app-help-img-thumb',
  templateUrl: './help-img-thumb.component.html',
  styleUrls: ['./help-img-thumb.component.scss'],
})
export class HelpImgThumbComponent implements OnDestroy {
  bsModalRef: BsModalRef
  @Input() title: string
  @Input() thumbImg: string
  @Input() content: string

  constructor(private modalService: BsModalService) {}

  // Open Modal
  openModalWithComponent(): void {
    const initialState = {
      title: this.title,
      img: this.content,
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
