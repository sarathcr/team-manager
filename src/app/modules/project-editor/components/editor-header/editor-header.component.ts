import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TitleData } from '../../constants/title-data.model';

@Component({
  selector: 'app-editor-header',
  templateUrl: './editor-header.component.html',
  styleUrls: ['./editor-header.component.scss']
})
export class EditorHeaderComponent implements OnInit {

  @Input() projectData: TitleData;
  @Output() titleBlur = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  handleTitleBlur(event: Event) {
   this.titleBlur.emit(event)
  }

}