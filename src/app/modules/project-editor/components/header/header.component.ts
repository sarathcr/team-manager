import { Component, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core'
import { Router } from '@angular/router'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'
import { ProjectTitle } from '../../constants/model/project.model'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() projectData: ProjectTitle
  @Input() stepOneStatus
  @Output() titleSubmit = new EventEmitter()
  modalRef: BsModalRef
  @ViewChild('modalUnlock') modalUnlock: TemplateRef<any>

  constructor(private router: Router, private modalService: BsModalService) { }

  handleTitleSubmit(event: Event): void {
    this.titleSubmit.emit(event)
  }

  onClick(id: number, event: any): void {
    if (this.stepOneStatus === 'DONE'){
      event.currentTarget.querySelector('button').blur()
      this.router.navigate([]).then(result => {  window.open('/output/project/' + id, '_blank') })
    }else {
      this.modalRef = this.modalService.show(this.modalUnlock, {
        class: 'common-modal modal-dialog-centered'
      })
    }
  }

  declineModal(): void {
    this.modalRef.hide()
  }

  confirmModalUnlock(): void {
    this.modalRef.hide()
  }
}
