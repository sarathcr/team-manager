import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { Observable } from 'rxjs'
import { EditorService } from 'src/app/modules/project-editor/services/editor/editor.service'
import { SubSink } from 'src/app/shared/utility/subsink.utility'
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
}
