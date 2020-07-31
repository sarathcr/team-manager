import { Component, Input, OnInit, OnDestroy } from '@angular/core'

import { ProjectEditorToastService } from '../../services/project-editor-toast/project-editor-toast.service'

import { ErrorType } from 'src/app/shared/constants/model/form-elements.model'

import { SubSink } from 'src/app/shared/utility/subsink.utility'

@Component({
  selector: 'app-error-toast',
  templateUrl: './error-toast.component.html',
  styleUrls: ['./error-toast.component.scss']
})
export class ErrorToastComponent implements OnInit, OnDestroy {

  @Input() type: ErrorType = 'danger'
  @Input() dissmissble = false
  @Input() timeout: number
  @Input() maxLimit = 3
  errors = []
  subscription = new SubSink()

  constructor(public projectEditorToastService: ProjectEditorToastService) { }

  ngOnInit(): void {
    this.subscription.sink = this.projectEditorToastService.error$.subscribe(error => {
      this.errors.push(error)
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  handleClose(index: number): void {
    this.errors.splice(index, 1)
  }

}
