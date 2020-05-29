import { Component, OnInit, Input} from '@angular/core';
import { StepId, Step } from '../../constants/step.model';
import { steps } from '../../constants/step.data';

@Component({
  selector: 'app-step-menu',
  templateUrl: './step-menu.component.html',
  styleUrls: ['./step-menu.component.scss']
})
export class StepMenuComponent implements OnInit {

  @Input() step: Step;
  @Input() spyActive: StepId;
  
  constructor() { }

  ngOnInit(): void {
  }
   
}
