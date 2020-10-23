import {
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { combineLatest, Observable, throwError } from 'rxjs'
import { catchError, skip } from 'rxjs/operators'
import { SubSink } from 'src/app/common-shared/utility/subsink.utility'
import { ClearAllSetTimeouts } from 'src/app/common-shared/utility/timeout.utility'
import {
  Activity,
  ActivityPhase,
} from '../../../../constants/model/activity.model'
import { Project, Step } from '../../../../constants/model/project.model'
import { EditorService } from '../../../../services/editor/editor.service'
import { DraggableRow } from '../../constants/model/draggable-row.model'
import { Box } from '../../constants/model/statistics-box.model'
import { ActivityEditorService } from '../../services/activity-editor.service'
import { DashboardService } from '../../services/dashboard.service/dashboard.service'
import { PickerService } from '../../services/picker.service/picker.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit, OnDestroy {
  activitiesData: Activity[]
  activitiesDataInitial: DraggableRow[]
  activitiesDataDevelop: DraggableRow[]
  activitiesDataSynthesis: DraggableRow[]
  clearTimeout = new ClearAllSetTimeouts()
  projectId: number
  project: Project
  subscriptions = new SubSink()
  bsModalRef: BsModalRef
  activityToDelete: Activity
  activityCloned: Activity
  activityToUpdate: Activity
  translations: string[]
  boxes: Box[]
  modalFormData: any
  action: string
  step$: Observable<Step>
  dropdownData: any
  localExperienceType: number
  isTitleLoading = false
  isTitleConflict = false
  errorSubscriptions = new SubSink()

  @ViewChild('modalDelete') deleteModal: TemplateRef<any>
  @ViewChild('modalUpdate') updateModal: TemplateRef<any>

  constructor(
    private activityEditorService: ActivityEditorService,
    public editor: EditorService,
    private modalService: BsModalService,
    private dashboardService: DashboardService,
    private renderer: Renderer2,
    private pickerService: PickerService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'page-background')
    this.dashboardService.initTranslations()
    this.initActivitiesData()
    this.localExperienceType = this.editor.getLocalExperienceType()
    setTimeout(() => {
      this.checkDurationHour()
    }, 0)
  }
  checkDurationHour(): void {
    this.modalFormData = this.dashboardService.initModalProjectTimeForm(
      this.project
    )
    if (this.modalFormData.data === '') {
      this.clearTimeout.add = this.openEditProjectModal(this.modalFormData)
    }
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'page-background')
    this.subscriptions.unsubscribe()
  }

  initActivitiesData(): void {
    this.subscriptions.sink = this.editor.activities$.subscribe((result) => {
      this.activitiesData = result
      this.subscriptions.sink = this.editor.project$.subscribe((project) => {
        if (project) {
          this.project = project
          this.projectId = project.id
          this.boxes = this.dashboardService.initBoxesData(
            this.activitiesData,
            project
          )
        }
      })

      this.subscriptions.sink = this.editor.loading$.subscribe((loading) => {
        if (!loading) {
          this.isTitleLoading = loading
        }
      })
      const initialActivities = this.activitiesData?.filter(
        (data) => data.phase === 'INITIAL'
      )
      const activitiesDevelop = this.activitiesData?.filter(
        (data) => data.phase === 'DEVELOP'
      )
      const activitiesSynthesis = this.activitiesData?.filter(
        (data) => data.phase === 'SYNTHESIS'
      )

      this.activitiesDataInitial = this.dashboardService.initDraggableRows(
        initialActivities,
        this.projectId
      )
      this.activitiesDataDevelop = this.dashboardService.initDraggableRows(
        activitiesDevelop,
        this.projectId
      )
      this.activitiesDataSynthesis = this.dashboardService.initDraggableRows(
        activitiesSynthesis,
        this.projectId
      )
    })
  }

  cloneActivity(activity: Activity): void {
    this.activityCloned = activity
    this.openModalUpdate(activity.updateType, 'INITIAL', this.activityCloned)
  }

  deleteActivity(activity: Activity): void {
    this.activityToDelete = activity
    this.bsModalRef = this.modalService.show(this.deleteModal, {
      class: 'modal-info  modal-dialog-centered',
    })
  }

  editActivity(activity: Activity): void {
    this.activityEditorService.updateActivity(activity)
  }

  declineModal(): void {
    this.editor.updateOneProjectFromCache({ error: null })
    this.bsModalRef.hide()
    if (this.activityCloned) {
      this.activityCloned = null
    }
    this.errorSubscriptions.unsubscribe()
  }

  confirmModalDelete(): void {
    this.activityEditorService.deleteActivities(this.activityToDelete)
    this.declineModal()
  }

  getActivityTitleError(): void {
    this.errorSubscriptions.sink = this.editor.project$
      .pipe(skip(1))
      .subscribe((project) => {
        this.isTitleConflict = !!project?.error
        if (!this.isTitleConflict) {
          this.declineModal()
          this.errorSubscriptions.unsubscribe()
        }
      })
  }
  openModalUpdate(
    type: string,
    phase: ActivityPhase,
    activity?: Activity
  ): void {
    this.getActivityTitleError()
    this.action = type
    let act
    if (type === 'create') {
      act = {
        name: '',
        phase,
        state: 'TO_DEFINE',
      }
    } else if (type === 'update' || type === 'clone') {
      act = activity
    }
    this.activityToUpdate = act
    if (this.activityCloned) {
      type = 'clone'
    }
    this.modalFormData = this.dashboardService.initModalForm(type, act)
    this.bsModalRef = this.modalService.show(this.updateModal, {
      class: 'modal-form  modal-dialog-centered',
    })
  }

  getTitleValueChange(event: any): void {
    this.isTitleConflict = false
  }

  confirmActivityUpdate(activityTitle: string): void {
    this.isTitleLoading = true
    const act: Activity = {
      ...this.activityToUpdate,
      updateType: this.action,
      name: activityTitle,
    }
    if (this.action === 'update') {
      this.activityEditorService.updateActivity(act)
    } else if (this.action === 'create') {
      this.activityEditorService.addActivity(act)
    } else if (this.action === 'updateActivity') {
      this.editor.handleSubmit({
        didacticSeqDuration: Number(activityTitle) * 60,
      })
      this.declineModal()
    } else if (this.action === 'clone') {
      this.activityEditorService.addActivity(act)
      this.activityCloned = null
    }
  }

  executeDropdownActions(row: DraggableRow): void {
    let act: Activity = this.activitiesData.filter(
      (activity) => activity.id === row.id
    )[0]
    act = { ...act, updateType: row.action }
    console.log('acrion')
    if (act.updateType === 'clone') {
      this.cloneActivity(act)
    } else if (act.updateType === 'update') {
      this.openModalUpdate(act.updateType, 'INITIAL', act)
    } else if (act.updateType === 'delete') {
      this.deleteActivity(act)
    } else if (act.updateType === 'moveup') {
      const order = {
        id: act.id,
        sortOrder: act.sortOrder - 1,
      }
      this.activityEditorService.updateSortOrderActivity(act, order)
    } else if (act.updateType === 'movedown') {
      const order = {
        id: act.id,
        sortOrder: act.sortOrder + 1,
      }
      this.activityEditorService.updateSortOrderActivity(act, order)
    }
  }

  openEditProjectModal(data: Box): void {
    this.action = 'updateActivity'
    this.modalFormData = this.dashboardService.initModalProjectTimeForm(
      this.project
    )
    this.bsModalRef = this.modalService.show(this.updateModal, {
      class: 'modal-form  modal-dialog-centered',
    })
    this.subscriptions.sink = this.translate
      .stream([
        'ACTIVITIES.activities_card_duration_project_title',
        'VARIABLES.experience_type_variable_2',
      ])
      .subscribe((translations) => {
        this.modalFormData.title =
          translations['ACTIVITIES.activities_card_duration_project_title'] +
          translations['VARIABLES.experience_type_variable_2'].split('|')[
            this.localExperienceType
          ]
      })
  }

  openPicker(): void {
    this.pickerService.onApiLoad()
  }
}
