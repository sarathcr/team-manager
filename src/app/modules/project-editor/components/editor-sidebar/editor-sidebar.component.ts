import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StepMenu } from '../../constants/step-menu.model';
import { Steps } from '../../constants/steps.model';

@Component({
  selector: 'app-editor-sidebar',
  templateUrl: './editor-sidebar.component.html',
  styleUrls: ['./editor-sidebar.component.scss']
})
export class EditorSidebarComponent implements OnInit {

  @Input() title: string;
  @Input() view: string;
  @Input() spyActive: Steps;
  @Input() items: StepMenu[];
  @Output() onStepClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  //Function to emit menu item number to output
  handleStepClick(id: number) {
    this.onStepClick.emit(id);
  }
}




