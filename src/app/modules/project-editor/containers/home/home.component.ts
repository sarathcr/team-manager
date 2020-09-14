import { Component, OnInit } from '@angular/core'
import { map } from 'rxjs/operators'
import { User } from 'src/app/modules/auth/constants/model/login'
import { UserEntityService } from 'src/app/modules/auth/store/entity/user/user-entity.service'
import { StorageService } from 'src/app/shared/services/storage/storage.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: User

  constructor(
    private storage: StorageService,
    private userService: UserEntityService
  ) {}

  ngOnInit(): void {
    this.getUsertype()
  }

  getUsertype(): void {
    const userId = this.storage.getUserId()
    this.userService.entities$
      .pipe(map((users) => users.find((user) => user.id === +userId)))
      .subscribe((user) => {
        if (!user) {
          this.userService.getByKey(userId)
        } else {
          this.user = user
        }
      })
  }
}
