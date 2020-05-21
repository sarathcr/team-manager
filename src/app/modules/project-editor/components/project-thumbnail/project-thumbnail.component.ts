import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/shared/constants/project.model';

@Component({
  selector: 'app-project-thumbnail',
  templateUrl: './project-thumbnail.component.html',
  styleUrls: ['./project-thumbnail.component.scss']
})
export class ProjectThumbnailComponent implements OnInit {

  constructor() { }

  @Input() project: Project;

  ngOnInit(): void {
  }

}
