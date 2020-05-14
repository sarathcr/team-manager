import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { LocalStorageService, Project } from 'src/app/services/localStorage.service';

@Component({
  selector: 'app-project-input-title',
  templateUrl: './project-input-title.component.html',
  styleUrls: ['./project-input-title.component.scss']
})
export class ProjectInputTitleComponent implements OnInit {
  @ViewChild('titleInput') inputElement: ElementRef;
  projectTitle: string;
  showInputfield = false;
  projectId: number;

  constructor(private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.getProjectDetails();
  }

  ngOnDestroy(): void{
    if (!this.projectTitle) {
      const noTitle ="Experiencia sin título"  // Default value for no title project
      this.handleSubmit(this.projectId, 'title', noTitle)
   }
  }

  // Function to get the project details from service.
  getProjectDetails(): void {
    const projectDetails: Project = this.localStorage.project;
    this.projectId = projectDetails.id;
    if (!projectDetails.title) {
      this.showInputfield = true;
    } else {
      this.projectTitle = projectDetails.title;
    }
  }

  // Function to show or hide the input text field.
  toggleInputfield(): void {
    this.showInputfield = true;
    setTimeout(() => this.inputElement.nativeElement.focus(), 0);
  }

  // Function to compare the title value and on blur of input field.
  handleBlur(value: any): void {
    if (this.projectTitle !== value) {
      this.projectTitle = value;
      this.handleSubmit(this.projectId, 'title', this.projectTitle)
      if (value) {
        this.showInputfield = false;
      }
    } else if (value) {
      this.showInputfield = false;
    }
  }
// Function saves the title to the backend
handleSubmit(id: number,key: string,value: any): void{
  this.localStorage.updateProject(id,key,value)
}
}
