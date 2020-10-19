import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { Observable } from 'rxjs'
import { SubSink } from 'src/app/common-shared/utility/subsink.utility'
import { EditorService } from 'src/app/modules/teacher/project-editor/services/editor/editor.service'
import { Activity } from '../../../../constants/model/activity.model'
import { ActivityEditorService } from '../../../activity/services/activity-editor.service'

@Component({
  selector: 'app-evaluation-editor',
  templateUrl: './evaluation-editor.component.html',
  styleUrls: ['./evaluation-editor.component.scss'],
})
export class EvaluationEditorComponent implements OnInit, OnDestroy {
  contextualStatus = false
  @ViewChild('modalCreate') updateModal: TemplateRef<any>
  activities$: Observable<Activity[]>
  activities: Activity[]
  hasEvaluableExercises = false

  subscriptions = new SubSink()
  bsModalRef: BsModalRef

  constructor(
    private modalService: BsModalService,
    private editorService: EditorService,
    private activityEditorService: ActivityEditorService
  ) {}

  ngOnInit(): void {
    this.activities$ = this.editorService.activities$
    this.subscriptions.sink = this.activities$.subscribe((act) => {
      this.activities = act
      if (act) {
        this.hasEvaluableExercises = this.containEvaluableExercises()
      }
    })
  }

  getContextualStatus($event: boolean): void {
    this.contextualStatus = $event
  }

  createActivity(): void {
    this.bsModalRef = this.modalService.show(this.updateModal, {
      class: 'modal-form  modal-dialog-centered',
    })
  }
  confirmActivityCreation(event: string): void {
    const act: Activity = {
      name: event,
      state: 'TO_DEFINE',
      phase: 'INITIAL',
    }
    this.activityEditorService.addActivity(act)
    this.declineModal()
  }
  declineModal(): void {
    this.bsModalRef.hide()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  containEvaluableExercises(): boolean {
    for (const activity of this.activities) {
      console.log(activity)
      if (activity.exercises) {
        for (const exercise of activity.exercises) {
          if (exercise.evaluation) {
            return true
          }
        }
      }
    }
    return false
  }
}
