import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'

import { ActivatedRoute, Router } from '@angular/router'
import { Activity } from '../../../../constants/model/activity.model'
import { EditorService } from '../../../../services/editor/editor.service'

@Component({
  selector: 'app-activity-editor',
  templateUrl: './activity-editor.component.html',
  styleUrls: ['./activity-editor.component.scss'],
})
export class ActivityEditorComponent
  implements OnInit, AfterViewInit, OnDestroy {
  activity: Activity
  activityId: string
  projectId: number | string
  contextualStatus = true
  headerHeight = 0
  currentComponent: string
  pageType: string
  experinceType: string
  contextualHelpHeight = 208
  @ViewChild('header') header: ElementRef
  @HostListener('window:scroll', ['$event'])
  adjustContextualHelpHeight(): void {
    const height = this.headerHeight - window.pageYOffset
    this.contextualHelpHeight = height < 0 ? 0 : height
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private editor: EditorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getActivity()
    this.projectId = this.editor.experienceId
    this.experinceType = this.editor.getExperienceUrl()
  }

  ngAfterViewInit(): void {
    this.calculateHeaderHeight()
  }

  ngOnDestroy(): void {
    this.editor.clearActivityData()
  }

  getContextualStatus($event: boolean): void {
    this.contextualStatus = $event
  }

  getActivity(): void {
    this.activityId = this.activatedRoute.snapshot.paramMap.get('id')
    this.activatedRoute.firstChild?.params.subscribe((route) => {
      this.pageType = route.page
    })
    this.editor.selectActivity(Number(this.activityId))
    this.activity = this.editor.activity
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

  isDefinitionView(): boolean {
    return this.router.url.includes('definition')
  }
}
