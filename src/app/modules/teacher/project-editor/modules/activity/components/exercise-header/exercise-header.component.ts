import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-exercise-header',
  templateUrl: './exercise-header.component.html',
  styleUrls: ['./exercise-header.component.scss'],
})
export class ExerciseHeaderComponent {
  @Input() buttonText = ''
  @Input() title = ''
  @Input() description = ''
  @Input() delivery = ''
  @Input() qualifiying = ''
  @Input() isDelivered = false
  @Input() isQualifying = false
  @Input() showCalifications = false
}
