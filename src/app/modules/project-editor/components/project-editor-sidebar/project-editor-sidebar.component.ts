import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-editor-sidebar',
  templateUrl: './project-editor-sidebar.component.html',
  styleUrls: ['./project-editor-sidebar.component.scss']
})
export class ProjectEditorSidebarComponent implements OnInit {

  @Input() title;
  @Input() view;
  @Input() items;
  @Input() status;
  @Output() notifyGrandParent= new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }
  
childEvent(value) {
  this.notifyGrandParent.emit(value);
}

}




