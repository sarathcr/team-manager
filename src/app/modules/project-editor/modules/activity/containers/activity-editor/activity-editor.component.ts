import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'

import { ActivatedRoute } from '@angular/router'
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
  projectId: number
  contextualStatus = true
  headerHeight: number
  currentComponent: string
  pageType: string
  @ViewChild('header') header: ElementRef
  constructor(
    private activatedRoute: ActivatedRoute,
    private editor: EditorService
  ) {}

  ngOnInit(): void {
    this.getActivity()
    this.projectId = this.editor.experienceId
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
    }, 0)
  }
}
