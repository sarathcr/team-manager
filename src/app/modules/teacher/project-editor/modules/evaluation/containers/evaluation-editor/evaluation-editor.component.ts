import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core'
import { Router } from '@angular/router'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { Observable } from 'rxjs'
import { SubSink } from 'src/app/common-shared/utility/subsink.utility'
import { EditorService } from 'src/app/modules/teacher/project-editor/services/editor/editor.service'
import { Activity, Exercise } from '../../../../constants/model/activity.model'
import { Project } from '../../../../constants/model/project.model'
import { ActivityEditorService } from '../../../activity/services/activity-editor.service'

@Component({
  selector: 'app-evaluation-editor',
  templateUrl: './evaluation-editor.component.html',
  styleUrls: ['./evaluation-editor.component.scss'],
})
export class EvaluationEditorComponent
  implements OnInit, OnDestroy, AfterViewInit {
  contextualStatus = true
  @ViewChild('modalCreate') updateModal: TemplateRef<any>
  activities$: Observable<Activity[]>
  activities: Activity[]
  exercises: Exercise[]
  hasExercises = false
  project: Project
  totalPercentage = 0
  hasPrevCards = false
  hasNextCards = false

  itemsPerSlide = 5
  singleSlideOffset = false
  noWrap = true

  subscriptions = new SubSink()
  bsModalRef: BsModalRef

  constructor(
    private modalService: BsModalService,
    private editorService: EditorService,
    private activityEditorService: ActivityEditorService,
    private elRef: ElementRef,
    private router: Router
  ) {}
  ngAfterViewInit(): void {
    this.updatePrevNext()
  }

  ngOnInit(): void {
    if (window.innerWidth <= 1444) {
      this.itemsPerSlide = 3
    }
    this.activities$ = this.editorService.activities$
    this.subscriptions.sink = this.editorService.project$.subscribe(
      (project) => (this.project = project)
    )
    this.subscriptions.sink = this.activities$.subscribe((act) => {
      this.activities = act
      if (act) {
        this.exercises = this.getExercises()
        this.hasExercises = this.exercises.length > 0
        this.totalPercentage = this.getTotalPercentage(this.exercises)
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

  containEvaluableExercises(exercises: Exercise[]): boolean {
    for (const exercise of exercises) {
      if (exercise.evaluation) {
        return true
      }
    }
  }
  getTotalPercentage(exercises: Exercise[]): number {
    let percentage = 0
    for (const exercise of exercises) {
      if (exercise.evaluation) {
        percentage += exercise.percentage
      }
    }
    return percentage
  }
  getExercises(): Exercise[] {
    const exercises: Exercise[] = []
    for (const activity of this.activities) {
      if (activity.exercises) {
        for (const exercise of activity.exercises) {
          const activityId = activity.id
          exercises.push({ ...exercise, activityId })
        }
      }
    }
    return exercises
  }

  updatePrevNext(): void {
    let slides
    setTimeout(() => {
      slides = this.elRef.nativeElement.getElementsByTagName('slide')
      if (slides.length > 0) {
        this.hasNextCards =
          slides.item(this.exercises.length - 1).className.indexOf('active') ===
          -1

        this.hasPrevCards = this.hasPrevCards =
          slides.item(0).className.indexOf('active') === -1
      }
    }, 0)
  }

  navigate(id: number): void {
    this.router.navigate([
      `/editor/project/${this.project.id}/activity/${id}/definition`,
    ])
  }
}
