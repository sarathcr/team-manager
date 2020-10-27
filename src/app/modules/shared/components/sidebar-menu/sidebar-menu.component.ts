import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { SidebarVariant } from 'src/app/common-shared/constants/model/sidebar-menu.model'

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
})
export class SidebarMenuComponent implements OnInit {
  @Input() icon: string
  @Input() text: string
  @Input() link: string
  @Input() updated = false
  @Input() variant: SidebarVariant
  @Input() disabled = false
  @ViewChild('modalSoon') modalSoon: TemplateRef<any>
  modalRef: BsModalRef
  soonTitle = 'COMING_SOON.inspire_comingsoon_title'
  soonDescription = 'COMING_SOON.inspire_comingsoon_description'

  constructor(public router: Router, private modalService: BsModalService) {}

  ngOnInit(): void {}

  navigateTo(route: string): void {
    if (!this.disabled) {
      this.router.navigate([route])
    } else {
      this.modalRef = this.modalService.show(this.modalSoon, {
        class: 'common-modal modal-dialog-centered',
      })
    }
  }
  declineModal(): void {
    this.modalRef.hide()
  }
}
