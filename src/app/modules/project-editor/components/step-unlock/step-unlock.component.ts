import { Component, OnInit, Input } from '@angular/core'

import { FieldConfig } from 'src/app/shared/constants/model/form-config.model'

@Component({
  selector: 'app-step-unlock',
  templateUrl: './step-unlock.component.html',
  styleUrls: ['./step-unlock.component.scss']
})
export class StepUnlockComponent implements OnInit {

  buttonConfig: FieldConfig
  textAreaConfig: FieldConfig
  @Input() StepThree: DefineStep
  @Input() StepFour: DefineStep

  constructor() { }

  ngOnInit(): void {
    this.createFormConfig()
  }

  createFormConfig(): void {
    this.buttonConfig = {
      name: 'submit',
      field: 'button',
      id: 'submitButton',
      disabled: false,
      submitted: false,
      label: 'IR A PUNTO DE PARTIDA'
    }
    this.textAreaConfig = {
      name: 'textarea',
      field: 'themes',
      id: 'themes',
      maxLength: 150,
      limit: 5
    }
  }

}

export interface DefineStep {
  step?: 'stepThree' | 'stepFour'
}
