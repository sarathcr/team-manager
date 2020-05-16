import { Component, OnInit } from '@angular/core';
import { Store, State } from '@ngrx/store';
import { ProjectsState } from '../../state/project.reducers';
// import { createProject } from '../../reducers/project-editor.actions';
import { Project } from 'src/app/shared/models/project.model';

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.scss']
})
export class ProjectEditorComponent implements OnInit {

  constructor(private store: Store<ProjectsState>) { }

  ngOnInit(): void {
  }
  temp: Project ={
    academicYear: undefined,
    commonThreads: undefined,
    creativeTitle: undefined,
    finalProduct: undefined,
    name: 'name',
    themes: undefined,
    title: 'sample Title',
    id: 1,
    country: undefined,
    grades: undefined,
    guideQuestions: undefined,
    region: undefined,
    subjects: undefined,
  }

  createProject() {
  //   this.store.dispatch(createProject({project: this.temp}))
  }

}
