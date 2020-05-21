import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StepMenu } from '../../constants/step-menu.model';

@Component({
  selector: 'app-step-menu',
  templateUrl: './step-menu.component.html',
  styleUrls: ['./step-menu.component.scss']
})
export class StepMenuComponent implements OnInit {

  @Input() item:any;
  @Input() status:string;
  @Input() selected:boolean;
  
  constructor() { }

  ngOnInit(): void {
  }
   
}
