import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'

import { validatePassword } from 'src/app/shared/utility/form.utility'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  loading = true
  modalOverTitle: string
  modalTitle: string
  modalConfirmLabel: string
  modalRef: BsModalRef
  resetPasswordForm: FormGroup
  buttonLoading = false
  @ViewChild('sendModal') sendModal: TemplateRef<any>
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sendRecoveryLink()
  }

  formInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [validatePassword]],
    })
  }

  get password(): AbstractControl {
    return this.resetPasswordForm.get('password')
  }

  sendRecoveryLink(): void {
    const token = this.route.snapshot.paramMap.get('token')
    const userId = this.route.snapshot.paramMap.get('userId')
    this.authService.sendRecoveryLink(userId, token).subscribe((success) => {
      if (success) {
        this.loading = false
        this.formInit()
      } else {
        this.router.navigate(['recovery-password-error'])
      }
    })
  }

  resetPassword(): void {
    if (this.resetPasswordForm.valid) {
      this.buttonLoading = true
      const userId = this.route.snapshot.paramMap.get('userId')
      this.authService
        .resetPassword(this.password.value, userId)
        .subscribe(() => {
          this.openModal()
          this.buttonLoading = false
        })
    }
  }

  confirmModal(): void {
    this.modalRef.hide()
    this.router.navigate(['login'])
  }

  openModal(): void {
    this.modalRef = this.modalService.show(this.sendModal, {
      ignoreBackdropClick: true,
      class: 'modal-info modal-dialog-centered',
    })
  }
}
