import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { Router } from '@angular/router'

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { AuthService } from '../../services/auth/auth.service'

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
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn() && this.authService.loggedUser?.id) {
      this.email = this.authService.loggedUser?.email
    } else {
      this.logoutUser()
    }
  }

  logoutUser(): void {
    this.authService.logout()
  }

  openModal(): void {
    this.authService.sendActivation().subscribe()
    this.modalRef = this.modalService.show(this.resendModal, {
      class: 'modal-info modal-dialog-centered',
    })
  }

  closeModal(): void {
    this.hideModal()
    this.logoutUser()
  }

  redirectToSignUp(): void {
    this.logoutUser()
    this.hideModal()
    this.router.navigate(['/register'])
  }

  hideModal(): void {
    this.modalRef.hide()
  }
}
