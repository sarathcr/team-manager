import { Component, OnInit, Input} from '@angular/core';
import { Step } from '../../constants/step.model';

@Component({
  selector: 'app-step-menu',
  templateUrl: './step-menu.component.html',
  styleUrls: ['./step-menu.component.scss']
})
export class StepMenuComponent implements OnInit {

  @Input() step: Step;
  
  constructor() { }

  ngOnInit(): void { }
   
}
