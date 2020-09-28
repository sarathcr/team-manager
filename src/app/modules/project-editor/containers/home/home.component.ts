import { Component, OnInit } from '@angular/core'
import { UserService } from 'src/app/modules/auth/services/user/user.service'
import { StorageService } from 'src/app/shared/services/storage/storage.service'
import { SubSink } from 'src/app/shared/utility/subsink.utility'

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
    })
  }
}
