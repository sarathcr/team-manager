import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms'
import { Router } from '@angular/router'

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'

import { validateEmail } from 'src/app/common-shared/utility/form.utility'
import { AuthService } from '../../services/auth/auth.service'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup
  loading = true
  modalOverTitle: string
  modalTitle: string
  modalConfirmLabel: string
  modalRef: BsModalRef
  @ViewChild('forgotPasswordModal') forgotPasswordModal: TemplateRef<any>
  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loading = false
    this.formInit()
  }

  formInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, validateEmail]],
    })
  }

  get email(): AbstractControl {
    return this.forgotPasswordForm.get('email')
  }

  backToLogin(): void {
    this.router.navigate(['login'])
  }

  sendInstructions(): void {
    if (this.forgotPasswordForm.valid) {
      this.openModal()
    }
  }

  confirmSendInstructions(): void {
    this.authService.sendRecovery(this.email.value).subscribe()
    this.modalRef.hide()
    this.router.navigate(['login'])
  }

  openModal(): void {
    this.modalRef = this.modalService.show(this.forgotPasswordModal, {
      ignoreBackdropClick: true,
      class: 'modal-info modal-dialog-centered',
    })
  }
}
