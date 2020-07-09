import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Observable } from 'rxjs'

import { EditorService } from '../../services/editor/editor.service'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'

import { Step } from '../../constants/model/project.model'

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
  bsModalRef: BsModalRef

  constructor(
    private route: ActivatedRoute,
    public editor: EditorService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.steps = this.editor.createSteps()
    this.projectUrl = this.route.snapshot.paramMap.get('id')
    this.editor.getProject(this.projectUrl)
    this.loaded$ = this.editor.loaded$
    // this.getModal()
  }

  ngOnDestroy(): void {
    this.editor.clearData()
  }

  getContextualStatus($event: boolean): void {
    this.contextualStatus = $event
  }
}

