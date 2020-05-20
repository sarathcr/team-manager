import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-editor-header',
  templateUrl: './project-editor-header.component.html',
  styleUrls: ['./project-editor-header.component.scss']
})
export class ProjectEditorHeaderComponent implements OnInit {

  @Input() projectTitle: string;
  @Input() projectId: number;
  @Input() newProject: any;
  @Output() titleBlur = new EventEmitter();
  showInputfield = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  // Function to handle the blur in title field
  handleTitleBlur(event: Event) {
    this.titleBlur.emit(event);
  }

}
