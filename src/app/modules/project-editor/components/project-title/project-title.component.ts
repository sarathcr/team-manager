import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { TitleData } from '../../constants/title-data.model';

@Component({
  selector: 'app-project-title',
  templateUrl: './project-title.component.html',
  styleUrls: ['./project-title.component.scss']
})
export class ProjectTitleComponent implements OnInit {

  @ViewChild('titleInput') inputElement: ElementRef;
  @Input() projectData: TitleData;
  @Input() maxLength: number;
  @Input() placeholder: any;
  @Output() titleBlur = new EventEmitter()
  tempTitle: string;
  showInputfield = true;

  constructor() { }

  ngOnInit(): void {
    if (this.projectData?.title) {
      this.tempTitle = this.projectData?.title
      this.showInputfield = false;
    }
  }

  // Function to show or hide the input text field.
  toggleInputfield(): void {
    this.showInputfield = true;
    setTimeout(() => this.inputElement.nativeElement.focus(), 0);
  }

  // Function to handle blur event of input field.
  handleBlur(event: Event): void {
    const inputValue = (<HTMLInputElement>event.target).value;
    this.tempTitle = inputValue;
    if (inputValue) {
      this.showInputfield = false;
    } else {
      this.showInputfield = true;
    }
    if(inputValue || this.projectData?.id){
      this.titleBlur.emit(event);
    }
  }
  
}
