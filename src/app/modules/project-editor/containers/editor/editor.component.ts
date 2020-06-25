import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Observable } from 'rxjs'

import { Step } from '../../constants/step.model'
import { EditorService } from '../../services/editor/editor.service'
import { SubSink } from 'src/app/shared/utility/subsink.utility'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {

  loaded$: Observable<boolean>
  projectUrl: string | number
  steps: Step[]
  contextualStatus = false
  loaded: boolean
  subscriptions = new SubSink()

  constructor(
    private route: ActivatedRoute,
    public editor: EditorService
  ) { }

  ngOnInit(): void {
    this.steps = this.editor.createSteps()
    this.projectUrl = this.route.snapshot.paramMap.get('id')
    this.editor.getProject(this.projectUrl)
    this.loaded$ = this.editor.loaded$
    this.showInitialLoading()
  }

  ngOnDestroy(): void {
    this.editor.clearData()
    this.subscriptions.unsubscribe()
  }

  getContextualStatus($event: boolean): void {
    this.contextualStatus = $event
  }

  showInitialLoading(): void {
    this.subscriptions.sink = this.loaded$.subscribe(loading => {
      this.loaded = loading
    })
  }

}
