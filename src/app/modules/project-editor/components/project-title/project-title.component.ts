import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { ProjectEntityService } from '../../services/project/project-entity.service';
import { NewProjectResService } from '../../services/project/new-project-res.service';
import { Project } from 'src/app/shared/constants/project.model';
import { initialProject } from 'src/app/shared/constants/project.data';

@Component({
  selector: 'app-project-title',
  templateUrl: './project-title.component.html',
  styleUrls: ['./project-title.component.scss']
})
export class ProjectTitleComponent implements OnInit {

  @ViewChild('titleInput') inputElement: ElementRef;
  @Input() project: any;
  @Input() maxLength: number;
  @Input() placeholder: any;
  @Output() blur = new EventEmitter();
  projectTitle: string;
  showInputfield = true;
  projectId: number;

  constructor(
    private projectsService: ProjectEntityService,
    private newProjectRes: NewProjectResService) { }

  ngOnInit(): void {
    if (this.project?.title) {
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
    const title = (<HTMLInputElement>event.target).value;
    if (title) {
      this.showInputfield = false;
    } else {
      this.showInputfield = true;
    }
    this.blur.emit(event);
    // create mode
    if (!this.project) {
      if (title == "") return // if not have the value
      const newProject: Project = {
        ...initialProject,
        title
      }
      this.projectsService.add(newProject)
        .subscribe(
          newProject => {
            console.log('New Course', newProject);
            this.newProjectRes.sendResponse(newProject)
          }
        );
    } else {
      // update mode
      if (title == this.project.title) return // check if value is same
      const updateProject = {
        id: this.project.id,
        title
      }
      this.projectsService.update(updateProject);
    }
  }
}
