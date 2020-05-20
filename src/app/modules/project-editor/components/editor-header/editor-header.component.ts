import { Component, OnInit, Input } from '@angular/core';
// import { LocalStorageService, Project } from 'src/app/services/localStorage.service';
import { Observable } from 'rxjs';
import { Project } from 'src/app/shared/models/project.model';

@Component({
  selector: 'app-editor-header',
  templateUrl: './editor-header.component.html',
  styleUrls: ['./editor-header.component.scss']
})
export class EditorHeaderComponent implements OnInit {

  @Input() project: string;
  @Input() newProject: any;
  projectTitle: string;
  showInputfield = false;
  projectId: number;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  // Function to handle the blur in title fiels
  handleTitleBlur(event: Event) {
    const title = (<HTMLInputElement>event.target).value;
    if (this.projectTitle != title) {
      this.projectTitle = title;
      // this.handleSubmit(this.projectId,'title',this.projectTitle)
    }
  }

}
