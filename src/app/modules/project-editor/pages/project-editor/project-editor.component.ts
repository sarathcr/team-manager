import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from 'src/app/shared/models/project.model';
import { ProjectEntityService } from '../../services/project-entity.service';


@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.scss']
})
export class ProjectEditorComponent implements OnInit, OnDestroy {

  project:Project;
  notFound$: Observable<number>;
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
  ) { }

  ngOnInit(): void {
    this.projectUrl = this.route.snapshot.paramMap.get('id');
    this.reload()
  }

  ngOnDestroy() {}

  // Function to handle blur of title field 
  handleTitleBlur(event: Event){
    const title = (<HTMLInputElement>event.target).value;
    if(!this.project?.id){
      this.handleSubmit({title});
    }else {
      if (title == this.project.title) return // check if value is same
      this.handleSubmit({title})
    }
  }

  // Function create or update the project
  handleSubmit(projectData: object){
    if(!this.project?.id){
      // create mode
      const newProject = {
        id:null,
        title:"",
        ...projectData
      }
      console.log(newProject)
      this.projectsService.add(newProject)
        .subscribe(
          newProject => {
            console.log('New Course', newProject);
            this.location.go('projects/' + newProject.id);
            this.projectUrl = newProject.id;
            this.reload();
          }
        );
    }else{
      // update mode
      const updateProject = {
        id: this.project.id,
        ...projectData
      }
      this.projectsService.update(updateProject);
    }
  }

  reload() {
    this.notFound$ = this.projectsService.entities$
      .pipe(
        map(projects => projects.filter(project => project.id === Number(this.projectUrl)).length)
      );

    if (this.projectUrl !== 'create') {
      this.projectsService.entities$
        .pipe(
          map(projects => projects.find(project => {
            return project.id === Number(this.projectUrl);
          }))
        ).subscribe(project=>{
          this.project=project
        });
    }
  }
}
