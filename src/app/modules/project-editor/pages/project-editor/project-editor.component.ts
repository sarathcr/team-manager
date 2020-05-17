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

  constructor() { }
  status='';
  title='crea paso apaso';
  view='Ver ficha estructura';
  items=[
    {id: 1, name:'Punto de partida'},
    {id: 2, name:'Temática'},
    {id: 3, name:'Objetivos competenciales'},
    {id: 4, name:'Contenidos'},
    {id: 5, name:'Evaluación'},
    {id: 6, name:'Título creativo'},
    {id: 7, name:'Preguntas guía'},
    {id: 8, name:'Producto final'},
    {id: 9, name:'Sinopsis'},
    {id: 10, name:'Interacción con alumnos'}
  ];

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
