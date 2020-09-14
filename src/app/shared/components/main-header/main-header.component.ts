import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { User } from 'src/app/modules/auth/constants/model/login'
import { AuthService } from 'src/app/modules/auth/services/auth.service'
import { DropdownElement } from '../../constants/model/form-elements.model'

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent {
  isShow = false
  @Input() user: User
  @Input() imgUrl: string
  @Input() buttonText: string
  profileDropdown: DropdownElement[] = [
    {
      icon: 'icon-ic_user',
      text: 'PRIVATEHOME_PROFILE.profile_dropdown_option_profile',
      action: 'profile',
    },
    {
      icon: 'icon-ic_copy',
      text: 'PRIVATEHOME_PROFILE.profile_dropdown_option_logout',
      action: 'logout',
    },
  ]
  constructor(private authService: AuthService, private router: Router) {}

  onDropdownSelect(data: DropdownElement): void {
    if (data.action === 'logout') {
      this.authService.logout()
    }
  }
}
