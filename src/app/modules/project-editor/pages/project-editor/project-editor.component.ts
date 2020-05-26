import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProjectEntityService } from '../../services/project/project-entity.service';
import { map } from 'rxjs/operators';
// ngx-translate
import { TranslateService } from '@ngx-translate/core';
import { Project } from 'src/app/shared/constants/project.model';
import { StepMenu } from 'src/app/modules/project-editor/constants/step-menu.model'
import { TitleData } from '../../constants/title-data.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.scss']
})
export class ProjectEditorComponent implements OnInit {
  project: Project;
  project$: Observable<Project>;
  notFound: boolean;
  titleData: TitleData;
  projectUrl: any;
  status: string;
  selected = true;
  notifyGrandParent: number;
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
          { id: 1, name: translations['STEPS_MENU.project_structure_stepsmenu_startingpoint'], done: false, selected: true, inprogress: false },
          { id: 2, name: translations['STEPS_MENU.project_structure_stepsmenu_topic'], done: false, selected: false, inprogress: false },
          { id: 3, name: 'Objetivos competenciales', done: true, selected: false, inprogress: false }, // add localization
          { id: 4, name: 'Contenidos', done: false, selected: false, inprogress: false }, // add localization
          { id: 5, name: 'Evaluación', done: false, selected: false, inprogress: false }, // add localization
          { id: 6, name: translations['STEPS_MENU.project_structure_stepsmenu_creativetitle'], done: false, selected: false, inprogress: false },
          { id: 7, name: translations['STEPS_MENU.project_stepsmenu_drivingquestion'], done: false, selected: false, inprogress: false },
          { id: 8, name: translations['STEPS_MENU.project_structure_stepsmenu_finalproduct'], done: false, selected: false, inprogress: false },
          { id: 9, name: translations['STEPS_MENU.project_structure_stepsmenu_sinopsis'], done: false, selected: false, inprogress: false },
          { id: 10, name: 'Interacción con alumnos', done: false, selected: false, inprogress: false } // add localization
        ];
      }
      );
  }

  // Function create or update the project
  handleSubmit(projectData: object) {
    console.log(projectData)
    if (!this.project?.id) {
      // create mode
      const newProject = {
        title: '',
        ...projectData
      }
      this.projectsService.add(newProject)
        .subscribe(
          newResProject => {
            this.location.go('projects/' + newResProject.id);
            this.projectUrl = newResProject.id;
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

  handleFormSubmit(data: any) {
    console.log(data, "from form")
    this.handleSubmit(data.data)
  }

  reload() {
    if (this.projectUrl !== 'create') {
      this.project$ = this.projectsService.entities$
        .pipe(
          map(projects => projects.find(project => {
            return project.id === Number(this.projectUrl);
          }))
        )
      this.project$.subscribe(project => {
        this.project = project;
        if (project) {
          this.notFound = false;
          this.titleData = { id: project.id, title: project.title };
        } else {
          // WIP
          // this.projectsService.getWithQuery(`/projects/${this.projectUrl.toString()}`);
          this.notFound = true;
        }
      })
    }
  }

  // inprogress
  updateInProgress(data: boolean) {
    console.log(data, "==> in progress") // WIP
    this.items[0].inprogress = data
  }

  //function to scroll to the step section
  handleScroll(value) {
    document.querySelector('#step-' + value).scrollIntoView()
  }

}
