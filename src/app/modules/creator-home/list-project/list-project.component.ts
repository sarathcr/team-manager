import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css']
})
export class ListProjectComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  redirect() {
    this.router.navigate(['./project-editor']);
  }
}
