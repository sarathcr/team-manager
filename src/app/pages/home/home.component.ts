import { Component, OnInit } from '@angular/core';
import { Project, LocalStorageService } from 'src/app/services/localStorage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Tus plantillas';
  allProjects: Project[];
  constructor(private localStorageService: LocalStorageService) { }
  ngOnInit(): void {
    this.allProjects = this.localStorageService.projectsList;
    if (this.allProjects && this.allProjects.length > 1){
      this.allProjects.sort((a, b) => {
        a.date = new Date(a.date);
        b.date = new Date(b.date);
        return  b.date.getTime() - a.date.getTime();
      });
    }
  }
}
