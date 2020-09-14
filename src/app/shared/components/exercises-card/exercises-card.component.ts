import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core'
import { ReferenceMaterials } from 'src/app/modules/project-editor/constants/model/activity.model'
import { MaterialCard } from 'src/app/shared/constants/model/exercises-card.model'

@Component({
  selector: 'app-exercises-card',
  templateUrl: './exercises-card.component.html',
  styleUrls: ['./exercises-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ExercisesCardComponent {
  @Input() title: string
  @Input() subtitle: string
  @Input() subtitleKey = 'EXERCISES_CARD.exercises_card_subtitle_key'
  @Input() subtitleValue: string
  @Input() description: string
  @Input() materials: ReferenceMaterials[]
  @Input() texts: MaterialCard = {
    label: 'MATERIAL.material_card_label',
    title: 'MATERIAL.material_card_title',
  }
  @Output() options = new EventEmitter()
  @Output() editExercise = new EventEmitter()

  onEdit(): void {
    this.editExercise.emit()
  }
  onClick(): void {
    this.options.emit()
  }
}
