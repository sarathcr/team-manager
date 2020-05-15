import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-editor-sidebar',
  templateUrl: './project-editor-sidebar.component.html',
  styleUrls: ['./project-editor-sidebar.component.scss']
})
export class ProjectEditorSidebarComponent implements OnInit {
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
  constructor() { }

  ngOnInit(): void {
  }

}




