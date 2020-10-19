import { Injectable } from '@angular/core'
import { User } from '../../constants/model/login.model'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { StorageService } from 'src/app/common-shared/services/storage/storage.service'
import { UserEntityService } from 'src/app/modules/auth/store/entity/user/user-entity.service'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User

  constructor(
    private storage: StorageService,
    private userService: UserEntityService
  ) {}

  getUser(): Observable<User> {
    const userId = this.getUserId()
    return this.userService.entities$.pipe(
      map((users) => {
        const user = users.find((userData) => userData.id === +userId)
        if (!user) {
          this.userService.getByKey(userId)
        } else {
          this.user = user
        }
        return user
      })
    )
  }

  checkUserProfile(): Promise<boolean> {
    return new Promise((resolve) => {
      this.userService.getByKey(this.getUserId()).subscribe((user) => {
        if (user) {
          this.user = user
          resolve(user.profileCompleted)
        }
      })
    })
  }

  getUserId(): number {
    return this.user?.id ? this.user.id : this.storage.getUserId()
  }

  updateUser(dataChange: any): Observable<any> {
    const { id, email, profile } = this.user
    const mandatoryFields = {
      id,
      email,
      profile,
    }
    const payload = { ...mandatoryFields, ...dataChange }
    return this.userService.update(payload)
  }
}
