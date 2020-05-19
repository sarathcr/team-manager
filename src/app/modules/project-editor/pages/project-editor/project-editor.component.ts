import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Project } from 'src/app/shared/models/project.model';
import { ActivatedRoute } from '@angular/router';
import { ProjectEntityService } from '../../services/project-entity.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { NewProjectResService } from '../../services/new-project-res.service';

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.scss']
})
export class ProjectEditorComponent implements OnInit, OnDestroy {

  project$: Observable<Project>
  notFound$: Observable<number>
  projectUrl;
  subscription: Subscription;
  status = '';
  title = 'crea paso apaso';
  view = 'Ver ficha estructura';
  items = [
    { id: 1, name: 'Punto de partida' },
    { id: 2, name: 'Temática' },
    { id: 3, name: 'Objetivos competenciales' },
    { id: 4, name: 'Contenidos' },
    { id: 5, name: 'Evaluación' },
    { id: 6, name: 'Título creativo' },
    { id: 7, name: 'Preguntas guía' },
    { id: 8, name: 'Producto final' },
    { id: 9, name: 'Sinopsis' },
    { id: 10, name: 'Interacción con alumnos' }
  ];

  constructor(
    private projectsService: ProjectEntityService,
    private route: ActivatedRoute,
    private location: Location,
    private newProjectRes: NewProjectResService,
  ) {
    this.subscription = this.newProjectRes.getResponse().subscribe(res => {
      console.log(res.id, 'router new parm')
      this.location.go('projects/' + res.id);
      this.projectUrl = res.id
      this.reload()
    })
  }

  ngOnInit(): void {
    this.projectUrl = this.route.snapshot.paramMap.get('id');
    this.reload()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  reload() {
    this.notFound$ = this.projectsService.entities$
      .pipe(
        map(projects => projects.filter(project => project.id == Number(this.projectUrl)).length)
      );

    if (this.projectUrl !== 'create') {
      this.project$ = this.projectsService.entities$
        .pipe(
          map(projects => projects.find(project => {
            return project.id == Number(this.projectUrl)
          }))
        )
    }
  }

}
