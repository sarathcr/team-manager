import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss'],
})
export class ActivationComponent implements OnInit {
  modalOverTitle: string
  modalTitle: string
  modalConfirmLabel: string
  modalRef: BsModalRef
  email: string
  @ViewChild('resendModal') resendModal: TemplateRef<any>

  constructor(
    private modalService: BsModalService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn() && this.authService.loggedUser?.id) {
      this.email = this.authService.loggedUser?.email
    }
    else {
      this.logoutUser()
    }
  }
  
  logoutUser(): void {
    this.authService.doLogoutUser()
    this.router.navigate(['/login'])
  }

  openModal(): void {
    this.modalRef = this.modalService.show(this.resendModal, {
      class: 'modal-form modal-dialog-centered',
    })
  }

  sendActivationLink(): void {
    this.authService.activate().subscribe()
    this.modalRef.hide()
    this.logoutUser()
  }

  declineModal(): void {
    this.modalRef.hide()
  }
}
