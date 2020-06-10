import { Component, OnInit, Input } from '@angular/core';
import { Step } from '../../constants/step.model';
import { buttonSubmitConfig } from '../../constants/form-config.data';

@Component({
  selector: 'app-step-six',
  templateUrl: './step-six.component.html',
  styleUrls: ['./step-six.component.scss']
})
export class StepSixComponent implements OnInit {

  @Input() step: Step
  buttonConfig = new buttonSubmitConfig
  
  constructor() { }

  ngOnInit(): void {
  }

  
}
