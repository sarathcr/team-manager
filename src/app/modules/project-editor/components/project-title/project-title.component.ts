import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core'
import { ProjectTitle } from '../../constants/title-data.model'

@Component({
  selector: 'app-project-title',
  templateUrl: './project-title.component.html',
  styleUrls: ['./project-title.component.scss']
})
export class ProjectTitleComponent implements OnInit {

  @ViewChild('titleInput') inputElement: ElementRef
  @Input() projectData: ProjectTitle
  @Input() maxLength: number
  @Input() placeholder: string
  @Output() titleBlur = new EventEmitter()
  tempTitle: string
  showInputfield = true

  constructor() { }

  ngOnInit(): void {
    if (this.projectData?.title) {
      this.tempTitle = this.projectData?.title
      this.showInputfield = false
    }
  }

  // Function to show or hide the input text field.
  toggleInputfield(): void {
    this.showInputfield = true
    setTimeout(() => this.inputElement.nativeElement.focus(), 0)
  }

  // Function to handle blur event of input field.
  handleBlur(event: Event): void {
    this.tempTitle = (<HTMLInputElement>event.target).value.trim()
    this.showInputfield = this.tempTitle ? false : true
    if ((this.tempTitle || this.projectData?.id)
      && (this.tempTitle !== this.projectData?.title)) { //check for same this.temptitle value
      this.titleBlur.emit({ title: this.tempTitle })
    }
  }
}
