import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Project, LocalStorageService } from 'src/app/services/localStorage.service';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css']
})
export class ListProjectComponent implements OnInit {

  constructor(private router: Router, private localStorageService: LocalStorageService) { }
  @Input() project: Project;
  ngOnInit(): void {
  }
  redirect(e,id) {
    this.localStorageService.getProject(id);
    this.router.navigate(['./project-editor']);
  }
}
