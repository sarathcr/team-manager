import { Component, OnInit } from '@angular/core'
import { StorageService } from 'src/app/common-shared/services/storage/storage.service'
import { SubSink } from 'src/app/common-shared/utility/subsink.utility'
import { UserService } from 'src/app/modules/auth/services/user/user.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  imageUrl = ''
  userType = ''
  username = ''
  workspace = ''
  profileCompleted = false
  subscriptions = new SubSink()

  constructor(
    private storage: StorageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUsertype()
  }

  getUsertype(): void {
    this.subscriptions.sink = this.userService.getUser().subscribe((user) => {
      this.imageUrl = user?.imageUrl
      this.userType = user?.usertype
      this.username = user?.name
      this.workspace = user?.workPlace?.name
      this.profileCompleted = user?.profileCompleted
    })
  }
}
