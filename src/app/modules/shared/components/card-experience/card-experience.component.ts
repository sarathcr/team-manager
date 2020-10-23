import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core'
import {
  Card,
  CardExperienceVariant,
  CardUser,
} from 'src/app/modules/shared/constants/model/card-experience.model'
import { Subject } from '../../constants/model/curriculum-data.model'

@Component({
  selector: 'app-card-experience',
  templateUrl: './card-experience.component.html',
  styleUrls: ['./card-experience.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardExperienceComponent implements OnInit {
  @Input() status = 'draft'
  @Input() notification = false
  @Input() data: Card
  @Input() isPro = false
  @Input() isInvitation = false
  @Input() teacherImgSrc: string
  @Input() experienceCreator: CardUser
  @Input() teacherList: CardUser[] = []
  @Input() progressCount
  @Input() variant: CardExperienceVariant = 'teacher'
  @Output() cardClick = new EventEmitter()
  extraSubjects: Subject[] = []

  ngOnInit(): void {
    this.getExtraSubjectsList()
  }

  constructor() {}

  getExtraSubjectsList(): Subject[] {
    if (this.data?.subjectOptions?.subjectCount > 4) {
      this.extraSubjects = this.data.subjectOptions.subjects.slice(4)
      return this.extraSubjects
    }
  }

  navigateToProject(): void {
    this.cardClick.emit()
  }
}
