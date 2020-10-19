import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { User } from 'src/app/modules/auth/constants/model/login.model'
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service'
import { DropdownElement } from '../../constants/model/form-elements.model'

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent {
  isShow = false
  @Input() userType: string
  @Input() imgUrl: string
  @Input() buttonText: string
  @Input() back = false
  @Input() title = ''
  @Input() username = ''
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
    switch (data.action) {
      case 'logout':
        this.authService.logout()
        break
      case 'profile':
        this.router.navigate(['/profile/details'])
    }
  }
}
