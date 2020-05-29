import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StepId, Step } from '../../constants/step.model';

@Component({
  selector: 'app-editor-sidebar',
  templateUrl: './editor-sidebar.component.html',
  styleUrls: ['./editor-sidebar.component.scss']
})
export class EditorSidebarComponent implements OnInit {

  @Input() title: string;
  @Input() view: string;
  @Input() spyActive: StepId;
  @Input() steps: Step[];

  constructor() { }

  ngOnInit(): void {
  }
  
}




