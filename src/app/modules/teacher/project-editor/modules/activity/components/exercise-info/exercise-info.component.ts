import { Component, Input } from '@angular/core'
import {
  ExercisePreview,
  ReferenceMaterialPreview,
} from '../../../../constants/model/activity-preview.model'

@Component({
  selector: 'app-exercise-info',
  templateUrl: './exercise-info.component.html',
  styleUrls: ['./exercise-info.component.scss'],
})
export class ExerciseInfoComponent {
  @Input() supertitle = ''
  @Input() title = ''
  @Input() date = ''
  @Input() delivery = ''
  @Input() qualifiying = ''
  @Input() isDelivered = false
  @Input() isQualifying = false

  @Input() statement = ''
  @Input() refMaterial: ReferenceMaterialPreview[]
  @Input() exercises: ExercisePreview[]
}
