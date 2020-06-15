import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Step } from '../../constants/step.model';
import { buttonSubmitConfig } from '../../constants/form-config.data';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss']
})
export class StepThreeComponent implements OnInit {

  project$: Observable<any>
  step$: Observable<Step>
  step: Step
  buttonConfig = new buttonSubmitConfig
  
  constructor() { }

  ngOnInit(): void {
  }

}
