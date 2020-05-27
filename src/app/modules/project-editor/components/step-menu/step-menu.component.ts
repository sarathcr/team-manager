import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-step-menu',
  templateUrl: './step-menu.component.html',
  styleUrls: ['./step-menu.component.scss']
})
export class StepMenuComponent implements OnInit {

  @Input() item:any;
  @Input() status: 'inprogress' | 'done' | 'pending';
  @Input() selected:boolean;
  
  constructor() { }

  ngOnInit(): void {
  }
   
}
