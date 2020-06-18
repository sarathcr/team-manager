import { Component, Input, Output, EventEmitter } from '@angular/core'
import { ProjectTitle } from '../../constants/title-data.model'

@Component({
  selector: 'app-editor-header',
  templateUrl: './editor-header.component.html',
  styleUrls: ['./editor-header.component.scss']
})
export class EditorHeaderComponent {

  @Input() projectData: ProjectTitle
  @Output() titleBlur = new EventEmitter()

  constructor() { }

  handleTitleBlur(event: Event) {
   this.titleBlur.emit(event)
  }
}
