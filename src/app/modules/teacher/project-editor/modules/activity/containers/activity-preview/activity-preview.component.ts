import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { map } from 'rxjs/operators'
import { Exercise } from 'src/app/common-shared/constants/model/exercise-sidebar.model'
import { unfreeze } from 'src/app/common-shared/utility/object.utility'
import { SubSink } from 'src/app/common-shared/utility/subsink.utility'
import { ActivityPreview } from '../../../../constants/model/activity-preview.model'
import { EditorService } from '../../../../services/editor/editor.service'
import { ActivityPreviewEntityService } from '../../../../store/entity/activity-preview/activity-preview-entity.service'

@Component({
  selector: 'app-activity-preview',
  templateUrl: './activity-preview.component.html',
  styleUrls: ['./activity-preview.component.scss'],
})
export class ActivityPreviewComponent
  implements OnInit, AfterViewInit, OnDestroy {
  activityId: string
  activity: ActivityPreview
  projectId: number
  experienceType: string
  contextualStatus = false
  headerHeight: number
  contextualHelpHeight = 0
  subscriptions = new SubSink()
  translations: string[]
  sidebarMenu: Exercise[]
  loading = false
  @ViewChild('header') header: ElementRef
  @HostListener('window:scroll', ['$event'])
  adjustContextualHelpHeight(): void {
    const height = this.headerHeight - window.pageYOffset
    this.contextualHelpHeight = height < 0 ? 0 : height
  }

  constructor(
    private editor: EditorService,
    private activatedRoute: ActivatedRoute,
    private activityPreviewService: ActivityPreviewEntityService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.activityId = this.activatedRoute.snapshot.paramMap.get('id')
    this.experienceType = this.editor.getExperienceUrl()
    this.subscriptions.sink = this.editor.project$.subscribe((project) => {
      this.projectId = project.id
    })

    this.subscriptions.sink = this.activityPreviewService.loading$.subscribe(
      (loading) => (this.loading = loading)
    )

    this.subscriptions.sink = this.activityPreviewService
      .getByKey(this.activityId)
      .pipe(
        map((res: any) => {
          const activityData = unfreeze(res)
          activityData.exercises = activityData.exercises?.sort((a, b) =>
            a.sortOrder > b.sortOrder ? 1 : -1
          )
          return activityData
        })
      )
      .subscribe((response) => {
        this.activity = response
        this.createSidebarData()
      })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
  ngAfterViewInit(): void {
    this.calculateHeaderHeight()
  }

  onResize(): void {
    this.calculateHeaderHeight()
  }
  calculateHeaderHeight(): void {
    setTimeout(() => {
      this.headerHeight = this.header.nativeElement.offsetHeight
      this.contextualHelpHeight = this.headerHeight
    }, 0)
  }

  getContextualStatus($event: boolean): void {
    this.contextualStatus = $event
  }
  createSidebarData(): void {
    if (this.activity.exercises) {
      this.subscriptions.sink = this.translate
        .stream(['ACTIVITIES.activity_card_exercice'])
        .subscribe((translations) => {
          this.translations = translations
          const exercises: Exercise[] = []
          for (let i = 0; i < this.activity.exercises.length; i++) {
            const exercise = this.activity.exercises[i]
            exercises.push({
              id: exercise.id,
              name:
                this.translations['ACTIVITIES.activity_card_exercice'] +
                ' ' +
                (i + 1),
              state: 'DEFAULT',
            })
          }
          this.sidebarMenu = exercises
        })
    } else {
      this.sidebarMenu = []
    }
  }

  scrollTo(el: string): void {
    document.querySelector('#' + el).scrollIntoView({ behavior: 'smooth' })
  }
}
