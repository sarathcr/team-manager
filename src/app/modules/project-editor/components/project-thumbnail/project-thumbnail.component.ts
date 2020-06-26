import { Component, Input } from '@angular/core'
import { Project } from 'src/app/modules/project-editor/constants/project.model'

@Component({
  selector: 'app-project-thumbnail',
  templateUrl: './project-thumbnail.component.html',
  styleUrls: ['./project-thumbnail.component.scss']
})
export class ProjectThumbnailComponent {

  constructor() { }

  @Input() project: Project

}
