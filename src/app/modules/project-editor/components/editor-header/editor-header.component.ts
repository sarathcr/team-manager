import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editor-header',
  templateUrl: './editor-header.component.html',
  styleUrls: ['./editor-header.component.scss']
})
export class EditorHeaderComponent implements OnInit {

  @Input() projectTitle: string;
  @Input() projectId: number;
  @Input() newProject: any;
  @Output() titleBlur = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  // Function to handle the blur in title field
  handleTitleBlur(event: Event) {
    this.titleBlur.emit(event);
  }

}
