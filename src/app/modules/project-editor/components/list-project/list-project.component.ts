import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/shared/models/project.model';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.scss']
})
export class ListProjectComponent implements OnInit {

  constructor() { }

  @Input() project: Project;

  ngOnInit(): void {
  }

}
