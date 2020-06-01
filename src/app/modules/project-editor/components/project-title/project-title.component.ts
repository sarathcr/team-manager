import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ProjectTitle } from '../../constants/title-data.model';

@Component({
  selector: 'app-project-title',
  templateUrl: './project-title.component.html',
  styleUrls: ['./project-title.component.scss']
})
export class ProjectTitleComponent implements OnInit {

  @ViewChild('titleInput') inputElement: ElementRef;
  @Input() projectData: ProjectTitle;
  @Input() maxLength: number;
  @Input() placeholder: any;
  @Output() titleBlur = new EventEmitter();
  tempTitle: string;
  showInputfield = true;

  constructor() { }

  ngOnInit(): void {
    if (this.projectData?.title) {
      this.tempTitle = this.projectData?.title;
      this.showInputfield = false;
    }
  }

  // Function to show or hide the input text field.
  toggleInputfield(): void {
    this.showInputfield = true;
    setTimeout(() => this.inputElement.nativeElement.focus(), 0);
  }

  // check title for initial space
  checkTitle(title: string) {
    const regex = /^\s*$/;
    if (regex.test(title)) {
      return "";  // return if the string contains only white spaces
    }
    return title;
  }

  // Function to handle blur event of input field.
  handleBlur(event: Event): void {
    const title = this.checkTitle((<HTMLInputElement>event.target).value);
    this.tempTitle = title;
    if (title) {
      this.showInputfield = false;
    } else {
      this.showInputfield = true;
    }
    if ((title || this.projectData?.id)
      && (title !== this.projectData?.title)) { //check for same title value
      this.titleBlur.emit({ title });
    }
  }

}
