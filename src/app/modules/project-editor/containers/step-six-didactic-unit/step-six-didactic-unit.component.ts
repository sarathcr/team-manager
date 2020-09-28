import { Component, OnDestroy, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { StepButtonSubmitConfig } from 'src/app/shared/constants/data/form-elements.data'
import { FieldEvent } from 'src/app/shared/constants/model/form-elements.model'
import { SubSink } from 'src/app/shared/utility/subsink.utility'
import { Status, Step } from '../../constants/model/project.model'
import { FormSixDidacticUnit } from '../../constants/model/step-forms.model'
import { EditorService } from '../../services/editor/editor.service'

@Component({
  selector: 'app-step-six-didactic-unit',
  templateUrl: './step-six-didactic-unit.component.html',
  styleUrls: ['./step-six-didactic-unit.component.scss'],
})
export class StepSixDidacticUnitComponent implements OnInit, OnDestroy {
  project$: Observable<any>
  step$: Observable<Step>
  synopsis$: Observable<any>
  step: Step
  synopsis = ''
  synopsisImage = ''
  initialFormStatus: Status = 'PENDING'
  buttonConfig = new StepButtonSubmitConfig()
  subscriptions = new SubSink()
  isFormUpdated = false
  localExperienceType: number

  constructor(public editor: EditorService) {}

  ngOnInit(): void {
    this.stepInIt()
    this.localExperienceType = this.editor.getLocalExperienceType()
  }

  ngOnDestroy(): void {
    if (this.isFormUpdated) {
      this.handleSubmit()
    }
    this.subscriptions.unsubscribe()
  }

  stepInIt(): void {
    this.project$ = this.editor.getDataByStep(6)
    this.step$ = this.editor.getStepStatus()
    this.step = this.editor.steps[5]
    if (this.project$) {
      this.subscriptions.sink = this.project$.subscribe((data) => {
        if (data) {
          this.synopsis = data.synopsis
          this.synopsisImage = data.synopsisImage
        }
      })
    }
    if (this.step$) {
      this.subscriptions.sink = this.step$.subscribe((formStatus) => {
        if (formStatus) {
          this.buttonConfig.submitted = formStatus.state === 'DONE'
          this.initialFormStatus = formStatus.state
          if (formStatus.state !== 'DONE' && this.checkNonEmptyForm()) {
            this.buttonConfig.disabled = false
          }
        }
      })
    }
  }

  // Function to trigger the value in the textarea
  onValueChange(value: FieldEvent): void {
    this.synopsis = value.value
    this.isFormUpdated = true
    this.checkStatus()
  }

  // Changes the button according to form status
  handleButtonType(): void {
    if (this.step.state === 'DONE') {
      this.buttonConfig.submitted = true
      this.buttonConfig.disabled = true
    } else {
      if (this.checkNonEmptyForm()) {
        this.buttonConfig.disabled = false
        this.buttonConfig.submitted = false
      } else {
        this.buttonConfig.disabled = true
        this.buttonConfig.submitted = false
      }
    }
  }

  checkNonEmptyForm(): boolean {
    if (this.synopsis && this.synopsisImage) {
      return true
    }
    return false
  }

  // Handle submit functionality
  handleSubmit(formStatus?: Status): void {
    if (formStatus === 'DONE') {
      this.step.state = formStatus
    }
    this.handleButtonType()
    const formData: FormSixDidacticUnit = {
      data: {
        synopsis: this.synopsis,
        creativeImage: this.synopsisImage,
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
    this.editor.handleStepSubmit(formData, this.step.state === 'DONE')
  }

  onFileSelect(url: string): void {
    this.synopsisImage = url
    this.isFormUpdated = true
    this.checkStatus()
  }

  // Function to check status of step
  checkStatus(): void {
    if (!this.synopsis && !this.synopsisImage) {
      this.step.state = 'PENDING'
    } else {
      this.step.state = 'INPROCESS'
    }
    this.handleButtonType()
  }
}
