import { Component, OnDestroy, OnInit } from '@angular/core'

import { Observable } from 'rxjs'
import { map, skip } from 'rxjs/operators'

import { EditorService } from '../../services/editor/editor.service'

import {
  Status,
  Step,
  Theme,
} from 'src/app/modules/teacher/project-editor/constants/model/project.model'
import { FormTwo } from '../../constants/model/step-forms.model'

import { StepButtonSubmitConfig } from 'src/app/common-shared/constants/data/form-elements.data'

import { SubSink } from 'src/app/common-shared/utility/subsink.utility'

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss'],
})
export class StepTwoComponent implements OnInit, OnDestroy {
  project$: Observable<any>
  step$: Observable<Step>
  step: Step
  themes: Theme[] = []
  buttonConfig = new StepButtonSubmitConfig()
  initialFormStatus: Status = 'PENDING'
  subscriptions = new SubSink()
  isFormUpdated = false
  localExperienceType: number
  constructor(public editor: EditorService) {}

  ngOnInit(): void {
    this.stepInIt()
    this.localExperienceType = this.editor.getLocalExperienceType()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  stepInIt(): void {
    this.project$ = this.editor.getDataByStep(2)
    this.step$ = this.editor.getStepStatus()
    this.step = this.editor.steps[1]
    this.subscriptions.sink = this.editor.nextLink$
      .pipe(skip(1))
      .subscribe((link) => {
        if (link && this.isFormUpdated) {
          this.editor.validatingProject = true
          this.handleSubmit()
        } else {
          this.editor.navigateToLink(false)
        }
      })
    if (this.project$) {
      this.subscriptions.sink = this.project$
        .pipe(map((data) => data?.themes))
        .subscribe((themes) => (this.themes = themes ? themes : []))
    }
    if (this.step$) {
      this.subscriptions.sink = this.step$.subscribe((formStatus) => {
        if (formStatus) {
          this.buttonConfig.submitted = formStatus.state === 'DONE'
          this.initialFormStatus = formStatus.state
          if (formStatus.state === 'INPROCESS' && this.themes?.length) {
            this.buttonConfig.disabled = false
          }
        }
      })
    }
  }

  addThemes(): void {
    // calls on every update
    this.checkStepStatus()
    this.handleSubmit()
  }

  // Funtion updates the edited list
  editTheme(themes: Theme[]): void {
    this.themes = themes
    this.checkStepStatus()
    this.handleSubmit()
  }

  // Function updates the deleted
  deleteTheme(themes: Theme[]): void {
    this.themes = themes
    this.checkStepStatus()
    this.isFormUpdated = true
  }

  // checks current form status
  checkStepStatus(): void {
    if (this.themes?.length) {
      this.step.state = 'INPROCESS'
    } else {
      this.step.state = 'PENDING'
    }
    this.handleButtonType()
  }

  // Changes the button according to form status
  handleButtonType(): void {
    if (this.step.state === 'DONE') {
      this.buttonConfig.submitted = true
      this.buttonConfig.disabled = true
    }
    if (this.step.state === 'INPROCESS') {
      this.buttonConfig.disabled = false
      this.buttonConfig.submitted = false
    }
    if (this.step.state === 'PENDING') {
      this.buttonConfig.disabled = true
      this.buttonConfig.submitted = false
    }
  }

  // Function to submit the form data
  handleSubmit(formStatus?: Status): void {
    this.handleButtonType()
    const tempData = this.themes.map((item) =>
      item.id == null ? { name: item.name } : item
    )
    this.themes = tempData
    const formData: FormTwo = {
      data: {
        themes: tempData.length ? this.themes : [],
      },
      stepStatus: {
        steps: [
          {
            state: this.step.state,
            stepid: this.step.stepid,
          },
        ],
      },
    }
    this.isFormUpdated = false
    this.editor.handleStepSubmit(formData, formStatus === 'DONE')
  }
}
