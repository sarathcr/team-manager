import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-input-title',
  templateUrl: './project-input-title.component.html',
  styleUrls: ['./project-input-title.component.css']
})
export class ProjectInputTitleComponent implements OnInit {
  projectTitle: string;
  constructor() { }

  ngOnInit(): void {
  }
}
