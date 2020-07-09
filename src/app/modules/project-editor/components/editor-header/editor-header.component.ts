import { Component, Input, Output, EventEmitter } from '@angular/core'
import { ProjectTitle } from '../../constants/model/project.model'


@Component({
  selector: 'app-editor-header',
  templateUrl: './editor-header.component.html',
  styleUrls: ['./editor-header.component.scss']
})
export class EditorHeaderComponent {

  @Input() projectData: ProjectTitle
  @Output() titleSubmit = new EventEmitter()

  constructor() { }

  handleTitleSubmit(event: Event): void {
    this.titleSubmit.emit(event)
  }
}
