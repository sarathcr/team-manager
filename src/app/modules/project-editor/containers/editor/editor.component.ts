import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { ModalFormComponent } from '../../components/modal-form/modal-form.component'

import { Observable } from 'rxjs'

import { Step } from '../../constants/step.model'
import { EditorService } from '../../services/editor/editor.service'
import { ModalInput } from '../../constants/modal-form-config.data'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'

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
    this.getModal()
    this.steps = this.editor.createSteps()
    this.projectUrl = this.route.snapshot.paramMap.get('id')
    this.editor.getProject(this.projectUrl)
    this.loaded$ = this.editor.loaded$
  }

  ngOnDestroy(): void {
    this.editor.clearData()
  }

  getModal(): void {
    const initialState = { modalConfig: { ...ModalInput } }
    this.bsModalRef = this.modalService.show(ModalFormComponent, { class: 'modal-form', initialState })
    this.bsModalRef.content.closeBtnName = 'Close'
  }

  getContextualStatus($event: boolean): void {
    this.contextualStatus = $event
  }
}

