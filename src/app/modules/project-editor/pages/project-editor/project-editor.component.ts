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
import { TitleData } from '../../constants/title-data.model';

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.scss']
})
export class ProjectEditorComponent implements OnInit {

  project: Project;
  notFound: number;
  titleData: TitleData;
  projectUrl: any;
  subscription: Subscription;
  status:string;
  selected:boolean = true;
  notifyGrandParent:number;
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
          { id: 1, name: translations['STEPS_MENU.project_structure_stepsmenu_startingpoint'], status: 'selected', selected: true },
          { id: 2, name: translations['STEPS_MENU.project_structure_stepsmenu_topic'], status: 'pending', selected: false },
          { id: 3, name: 'Objetivos competenciales', status: 'pending', selected: false }, // add localization
          { id: 4, name: 'Contenidos', status: 'pending', selected: false }, // add localization
          { id: 5, name: 'Evaluación', status: 'pending', selected: false }, // add localization
          { id: 6, name: translations['STEPS_MENU.project_structure_stepsmenu_creativetitle'], status: 'pending', selected: false },
          { id: 7, name: translations['STEPS_MENU.project_stepsmenu_drivingquestion'], status: 'pending', selected: false },
          { id: 8, name: translations['STEPS_MENU.project_structure_stepsmenu_finalproduct'], status: 'pending', selected: false },
          { id: 9, name: translations['STEPS_MENU.project_structure_stepsmenu_sinopsis'], status: 'pending', selected: false },
          { id: 10, name: 'Interacción con alumnos', status: 'pending', selected: false } // add localization
        ];
      }
      );
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
    if (this.projectUrl !== 'create') {
      this.projectsService.entities$
        .pipe(
          map(projects => projects.find(project => {
            return project.id === Number(this.projectUrl);
          }))
        ).subscribe(project => {
          this.project = project;
          if (project) {
            this.notFound = 1;
            this.titleData = { id: project.id, title: project.title };
          } else {
            this.notFound = 0;
          }
        });
    }
  }

  //function to scroll to the step section
  handleScroll(value) {
    document.querySelector('#step-' + value).scrollIntoView();
  }

}
