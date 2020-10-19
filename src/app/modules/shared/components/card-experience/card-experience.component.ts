import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core'
import { Router } from '@angular/router'
import { UserService } from 'src/app/modules/auth/services/user/user.service'
import { CardExperienceVariant } from 'src/app/modules/shared/constants/model/card-experience.model'

import {
  Project,
  Subject,
} from 'src/app/modules/teacher/project-editor/constants/model/project.model'

@Component({
  selector: 'app-card-experience',
  templateUrl: './card-experience.component.html',
  styleUrls: ['./card-experience.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardExperienceComponent implements OnInit {
  @Input() status = 'draft'
  @Input() notification = false
  @Input() data: Project
  @Input() isInvited = false
  @Input() isPro = false
  @Input() invitation = false
  @Input() teacherImgSrc: string
  @Input() teacherList = []
  @Input() progressCount: number
  @Input() variant: CardExperienceVariant = 'teacher'
  @Output() cardClick = new EventEmitter()
  extraSubjects: Subject[] = []

  ngOnInit(): void {
    this.getExtraSubjectsList()
  }

  constructor(private router: Router, private userService: UserService) {}

  getExtraSubjectsList(): Subject[] {
    if (this.data.subjects.length > 4) {
      this.extraSubjects = this.data.subjects.slice(4)
      return this.extraSubjects
    }
  }

  navigateToProject(): void {
    if (this.variant !== 'template' && this.userService.user.profileCompleted) {
      this.router.navigate([
        `editor/${this.data?.type.split('_').join('-').toLowerCase()}/${
          this.data.id
        }/1`,
      ])
    }
    this.cardClick.emit()
  }
}
