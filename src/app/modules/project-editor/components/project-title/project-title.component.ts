import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-title',
  templateUrl: './project-title.component.html',
  styleUrls: ['./project-title.component.scss']
})
export class ProjectTitleComponent implements OnInit {

  @ViewChild('titleInput') inputElement: ElementRef;
  @Input() value: any;
  @Input() projectId: number;
  @Input() maxLength: number;
  @Input() placeholder: any;
  @Output() blur = new EventEmitter()
  tempValue: string;
  showInputfield = true;

  constructor() { }

  ngOnInit(): void {
    if (this.value) {
      this.tempValue = this.value
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
    this.tempValue = inputValue;
    if (inputValue) {
      this.showInputfield = false;
    } else {
      this.showInputfield = true;
    }
    if(inputValue || this.projectId){
      this.blur.emit(event);
    }
  }
  
}
