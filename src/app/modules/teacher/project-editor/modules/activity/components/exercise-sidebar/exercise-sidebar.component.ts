import { Component, EventEmitter, Input, Output } from '@angular/core'

import { Exercise } from 'src/app/common-shared/constants/model/exercise-sidebar.model'

@Component({
  selector: 'app-exercise-sidebar',
  templateUrl: './exercise-sidebar.component.html',
  styleUrls: ['./exercise-sidebar.component.scss'],
})
export class ExerciseSidebarComponent {
  @Input() exercises: Exercise[]
  @Input() actived: number
  @Output() element = new EventEmitter<string>()

  onClick(index: number): void {
    this.element.emit('exercise' + index)
    this.actived = index
  }
}
