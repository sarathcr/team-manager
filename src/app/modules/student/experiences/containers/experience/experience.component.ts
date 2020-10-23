import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { map } from 'rxjs/operators'
import { SubSink } from 'src/app/common-shared/utility/subsink.utility'
import { UserService } from 'src/app/modules/auth/services/user/user.service'
import { StudentActivityRP } from '../../constants/model/activities.model'
import { CardListEntityService } from '../../store/entity/card-list/card-list-entity.service'
import { StudentActivityEntityService } from '../../store/entity/student-activity/student-activity-entity.service'

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ExperienceComponent implements OnInit, OnDestroy {
  studentActivities: StudentActivityRP
  userId: number
  projectId: string
  subscription = new SubSink()
  userSubscription = new SubSink()
  constructor(
    private studentActivityService: StudentActivityEntityService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private cardListService: CardListEntityService
  ) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id')
    this.getUserId()
    this.cardListService.clearCache() // To clear card list store
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  getUserId(): void {
    this.userSubscription.sink = this.userService
      .getUser()
      .subscribe((user) => {
        if (user) {
          this.userId = user.id
          this.getActivities()
          this.userSubscription.unsubscribe()
        }
      })
  }
  getActivities(): void {
    this.subscription.sink = this.studentActivityService.entities$
      .pipe(
        map((activityList) =>
          activityList.find(
            (activities) =>
              activities.projectId === +this.projectId &&
              activities.studentId === this.userId
          )
        )
      )
      .subscribe((activities) => {
        if (!activities) {
          this.studentActivityService.getWithQuery({
            studentId: this.userId.toString(),
            projectId: this.projectId,
          })
        } else {
          this.studentActivities = activities
        }
      })
  }
}
