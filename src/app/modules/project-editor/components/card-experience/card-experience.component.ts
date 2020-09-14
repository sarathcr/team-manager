import { Component, Input } from '@angular/core'
import { Project } from 'src/app/modules/project-editor/constants/model/project.model'

@Component({
  selector: 'app-card-experience',
  templateUrl: './card-experience.component.html',
  styleUrls: ['./card-experience.component.scss'],
})
export class CardExperienceComponent {
  @Input() status = 'draft'
  @Input() notification = false
  @Input() data: Project

  constructor() {}
}
