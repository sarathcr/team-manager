import { Component, OnInit } from '@angular/core';
import { LocalStorageService, Project } from 'src/app/services/localStorage.service';

@Component({
  selector: 'app-project-editor-header',
  templateUrl: './project-editor-header.component.html',
  styleUrls: ['./project-editor-header.component.scss']
})
export class ProjectEditorHeaderComponent implements OnInit {
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

  // Function to get the project details.
  getProjectDetails(): void {
    const projectDetails: Project = this.localStorage.project;
    this.projectId = projectDetails.id;
    if (!projectDetails.title) {
      this.showInputfield = true;
    } else {
      this.projectTitle = projectDetails.title;
    }
  }

  // Function to handle the blur in title fiels
  handleTitleBlur(event: Event){
    const title= (<HTMLInputElement>event.target).value;
    if(this.projectTitle!=title) {
      this.projectTitle=title;
      this.handleSubmit(this.projectId,'title',this.projectTitle)
    }
  }

  // Function submit the title to the backend
  handleSubmit(id: number,key: string,value: any): void{
  this.localStorage.updateProject(id,key,value)
}

}
