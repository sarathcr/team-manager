import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
// ngx-translate
import { TranslateService } from '@ngx-translate/core';
import { Project } from 'src/app/shared/constants/project.model';
import { ProjectEntityService } from '../../services/project-entity.service';
import { StepMenu } from 'src/app/modules/project-editor/constants/step-menu.model'

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.scss']
})
export class ProjectEditorComponent implements OnInit {

  project: Project;
  notFound$: Observable<number>;
  projectUrl;
  subscription: Subscription;
  status = '';
  items: Array<StepMenu>;

  constructor(
    private projectsService: ProjectEntityService,
    private route: ActivatedRoute,
    private location: Location,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.projectUrl = this.route.snapshot.paramMap.get('id');
    this.createStepList();
    this.reload();
  }

  // to create step list
  createStepList() {
    // localization for step menu
    this.translate.stream(
      [
        'STEPS_MENU.project_structure_stepsmenu_startingpoint',
        'STEPS_MENU.project_structure_stepsmenu_topic',
        'STEPS_MENU.project_structure_stepsmenu_creativetitle',
        'STEPS_MENU.project_stepsmenu_drivingquestion',
        'STEPS_MENU.project_structure_stepsmenu_finalproduct',
        'STEPS_MENU.project_structure_stepsmenu_sinopsis',
      ])
      .subscribe(translations => {
        this.items = [
          { id: 1, name: translations['STEPS_MENU.project_structure_stepsmenu_startingpoint'] },
          { id: 2, name: translations['STEPS_MENU.project_structure_stepsmenu_topic'] },
          { id: 3, name: 'Objetivos competenciales' }, // add localization
          { id: 4, name: 'Contenidos' }, // add localization
          { id: 5, name: 'Evaluación' }, // add localization
          { id: 6, name: translations['STEPS_MENU.project_structure_stepsmenu_creativetitle'] },
          { id: 7, name: translations['STEPS_MENU.project_stepsmenu_drivingquestion'] },
          { id: 8, name: translations['STEPS_MENU.project_structure_stepsmenu_finalproduct'] },
          { id: 9, name: translations['STEPS_MENU.project_structure_stepsmenu_sinopsis'] },
          { id: 10, name: 'Interacción con alumnos' } // add localization
        ];
      }
      );
  }

  // Function to handle blur of title field 
  handleTitleBlur(event: Event) {
    const title = (<HTMLInputElement>event.target).value;
    if (!this.project?.id) {
      this.handleSubmit({ title });
    } else {
      if (title == this.project.title) return // check if value is same
      this.handleSubmit({ title })
    }
  }

  // Function create or update the project
  handleSubmit(projectData: object) {
    if (!this.project?.id) {
      // create mode
      const newProject = {
        id: null,
        title: "",
        ...projectData
      }
      console.log(newProject)
      this.projectsService.add(newProject)
        .subscribe(
          newProject => {
            this.location.go('projects/' + newProject.id);
            this.projectUrl = newProject.id;
            this.reload();
          }
        );
    } else {
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
        ).subscribe(project => {
          this.project = project
        });
    }
  }
}
