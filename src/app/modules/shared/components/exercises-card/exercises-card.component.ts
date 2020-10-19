import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core'
import {
  entityType,
  ReferenceMaterials,
} from 'src/app/modules/teacher/project-editor/constants/model/activity.model'
import { MaterialCard } from '../../constants/model/exercises-card.model'

@Component({
  selector: 'app-exercises-card',
  templateUrl: './exercises-card.component.html',
  styleUrls: ['./exercises-card.component.scss'],
})
export class ExercisesCardComponent {
  @Input() title: string
  @Input() subtitle: string
  @Input() subtitleKey = 'EXERCISES_CARD.exercises_card_subtitle_key'
  @Input() subtitleValue: string
  @Input() entityType: entityType
  @Input() description: string
  @Input() evaluation: boolean
  @Input() selectedExcerciseId: number
  @Input() materials: ReferenceMaterials[]
  @Input() texts: MaterialCard = {
    label: 'MATERIAL.material_card_label',
    title: 'MATERIAL.material_card_title',
  }
  @Output() options = new EventEmitter()
  @Output() editExercise = new EventEmitter()
  @Output() updateExerciseTitle = new EventEmitter()
  @Output() changeExerciseVisibility = new EventEmitter()

  onEdit(): void {
    this.editExercise.emit()
  }
  onClick(): void {
    this.options.emit()
  }
  onExcerciseTitleEdit(): void {
    this.updateExerciseTitle.emit()
  }
  changeVisibility(id: number, visible: boolean): void {
    this.changeExerciseVisibility.emit({
      id,
      visible,
      excericeId: this.selectedExcerciseId,
    })
  }
}
