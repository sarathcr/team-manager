import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { LocalStorageService, Project } from 'src/app/services/localStorage.service';

@Component({
  selector: 'app-project-input-title',
  templateUrl: './project-input-title.component.html',
  styleUrls: ['./project-input-title.component.css']
})
export class ProjectInputTitleComponent implements OnInit {
  @ViewChild("titleInput") inputElement: ElementRef;
  projectTitle: string;
  showInputfield = false;
  projectDetails: Project;
  projectId: number;

  constructor(private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.getProjectDetails();
  }

  // Function to get the project details from service.
  getProjectDetails(): void {
    this.projectDetails = this.localStorage.project;
    this.projectId = this.projectDetails.id;
    if (this.projectDetails.title === "" || this.projectDetails.title === null) {
      this.showInputfield = true;
    } else {
      this.projectTitle = this.projectDetails.title;
    }
  }

  // Function to show or hide the input text field.
  toggleInputfield(): void {
    this.showInputfield = true;
    setTimeout(() => this.inputElement.nativeElement.focus(), 0)
  }

  // Function to compare the title value and to save the value.
  handleBlur(value: any): void {
    console.log(value)
    if (this.projectTitle !== value) {
      this.projectTitle = value;
      this.localStorage.updateProject(this.projectId, "title", this.projectTitle)
      if (value !== "" && value !== null) {
        this.showInputfield = false;
      }
    } else {
      this.showInputfield = false;
    }
  }

}
