import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
// ngx-translate
import { TranslateService } from '@ngx-translate/core';

import { NewProjectResService } from '../../services/new-project-res.service';
import { ProjectEntityService } from '../../services/project-entity.service';
import { Project } from 'src/app/shared/models/project.model';





@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.scss']
})
export class ProjectEditorComponent implements OnInit, OnDestroy {

  project$: Observable<Project>;
  notFound$: Observable<number>;
  projectUrl;
  subscription: Subscription;
  status = '';
  items: object[];


  constructor(
    private projectsService: ProjectEntityService,
    private route: ActivatedRoute,
    private location: Location,
    private newProjectRes: NewProjectResService,
    private translate :TranslateService
  ) {
    this.subscription = this.newProjectRes.getResponse().subscribe(res => {
      console.log(res.id, 'router new parm');
      this.location.go('projects/' + res.id);
      this.projectUrl = res.id;
      this.reload();
    })
  }

  ngOnInit(): void {
    this.projectUrl = this.route.snapshot.paramMap.get('id');
    this.createStepList();
    this.reload();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // to create step list
  createStepList(){
       // localization for step menu
       this.translate.stream(
        [
          'STEPS_MENU.project_structure_stepsmenu_startingpoint',
          'STEPS_MENU.project_structure_stepsmenu_topic',
          'STEPS_MENU.project_structure_stepsmenu_creativetitle',
          'STEPS_MENU.project_stepsmenu_drivingquestion',
          'STEPS_MENU.project_structure_stepsmenu_finalproduct',
          'STEPS_MENU.project_structure_stepsmenu_sinopsis',
        ]
        ).subscribe(
        translations => {
         this.items=[
              {id: 1, name: translations['STEPS_MENU.project_structure_stepsmenu_startingpoint']},
              {id: 2, name: translations['STEPS_MENU.project_structure_stepsmenu_topic']},
              {id: 3, name:'Objetivos competenciales'}, // add localization
              {id: 4, name:'Contenidos'}, // add localization
              {id: 5, name:'Evaluación'}, // add localization
              {id: 6, name: translations['STEPS_MENU.project_structure_stepsmenu_creativetitle']},
              {id: 7, name: translations['STEPS_MENU.project_stepsmenu_drivingquestion']},
              {id: 8, name: translations['STEPS_MENU.project_structure_stepsmenu_finalproduct']},
              {id: 9, name: translations['STEPS_MENU.project_structure_stepsmenu_sinopsis']},
              {id: 10, name:'Interacción con alumnos'} // add localization
            ];
        }
     );
  }

  reload() {
    this.notFound$ = this.projectsService.entities$
      .pipe(
        map(projects => projects.filter(project => project.id === Number(this.projectUrl)).length)
      );

    if (this.projectUrl !== 'create') {
      this.project$ = this.projectsService.entities$
        .pipe(
          map(projects => projects.find(project => {
            return project.id === Number(this.projectUrl);
          }))
        );
    }
  }
}
