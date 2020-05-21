import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StepMenu } from '../../constants/step-menu.model';

@Component({
  selector: 'app-editor-sidebar',
  templateUrl: './editor-sidebar.component.html',
  styleUrls: ['./editor-sidebar.component.scss']
})
export class EditorSidebarComponent implements OnInit {
  
  @Input() title:string;
  @Input() view:string;
  @Input() items:Array<StepMenu>;
  @Input() status:string;
  @Input() selected:boolean;
  @Output() childClick= new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }
  
  //Function to emit menu item number to output
  childEvent(value) {
    this.childClick.emit(value);
  }
}




