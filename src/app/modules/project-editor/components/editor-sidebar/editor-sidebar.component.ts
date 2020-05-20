import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editor-sidebar',
  templateUrl: './editor-sidebar.component.html',
  styleUrls: ['./editor-sidebar.component.scss']
})
export class EditorSidebarComponent implements OnInit {
  
  @Input() title;
  @Input() view;
  @Input() items;
  @Input() status;
  @Input() selected;
  @Output() notifyGrandParent= new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }
  
  //Function to emit menu item number to output
  childEvent(value) {
    this.notifyGrandParent.emit(value);
  }
}




