import { Component, OnInit } from '@angular/core';
import { Project, LocalStorageService } from 'src/app/services/localStorage.service';


@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']

})
export class AddProjectComponent implements OnInit {
  constructor(private localStorage: LocalStorageService) { }

  ngOnInit(): void {
  }
  addNewProject(){
    const newProject: Project = {
      id: (this.localStorage.projectsList == null || this.localStorage.projectsList.length === 0) ? 1
        : this.localStorage.projectsList.length + 1,
      title: 'project '.concat((this.localStorage.projectsList == null || this.localStorage.projectsList.length === 0) ? String(1)
      : String(this.localStorage.projectsList.length + 1)),
      // title: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: 'https://homepages.cae.wisc.edu/~ece533/images/monarch.png',
      theme: 'Some blah blah',
      status: 'Done',
      threads: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      ],
      date: new Date()
    };
    this.localStorage.addProject(newProject);
  }

}
