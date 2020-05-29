import { Component, OnInit, Input} from '@angular/core';
import { Steps } from '../../constants/steps.model';
import { steps } from '../../constants/steps.data';

@Component({
  selector: 'app-step-menu',
  templateUrl: './step-menu.component.html',
  styleUrls: ['./step-menu.component.scss']
})
export class StepMenuComponent implements OnInit {

  @Input() item:any;
  @Input() i: number;
  @Input() spyActive: Steps;
  steps: Steps[] =  [...steps]
  
  constructor() { }

  ngOnInit(): void {
  }
   
}
