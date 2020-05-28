import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProjectEntityService } from '../../services/project/project-entity.service';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Project } from 'src/app/shared/constants/project.model';
import { StepMenu } from 'src/app/modules/project-editor/constants/step-menu.model'
import { TitleData } from '../../constants/title-data.model';
import { Observable } from 'rxjs';
import { Steps } from '../../constants/steps.model';

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
  items: StepMenu[];
  status: string;
  spyActive: Steps = 'stepOne'

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
          { id: 1, name: translations['STEPS_MENU.project_structure_stepsmenu_startingpoint'], status: 'pending' },
          { id: 2, name: translations['STEPS_MENU.project_structure_stepsmenu_topic'], status: 'pending' },
          { id: 3, name: 'Objetivos competenciales', status: 'pending' }, // add localization
          { id: 4, name: 'Contenidos', status: 'pending' }, // add localization
          { id: 5, name: 'Evaluación', status: 'pending' }, // add localization
          { id: 6, name: translations['STEPS_MENU.project_structure_stepsmenu_creativetitle'], status: 'pending' },
          { id: 7, name: translations['STEPS_MENU.project_stepsmenu_drivingquestion'], status: 'pending' },
          { id: 8, name: translations['STEPS_MENU.project_structure_stepsmenu_finalproduct'], status: 'pending' },
          { id: 9, name: translations['STEPS_MENU.project_structure_stepsmenu_sinopsis'], status: 'pending' },
          { id: 10, name: 'Interacción con alumnos', status: 'pending' } // add localization
        ];
      }
      );
  }


  // Function create or update the project
  handleSubmit(projectData: object) {
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

  handleFormSubmit(data: any) {
    this.status = data.status;
    this.handleSubmit(data.data)
  }

  // inprogress
  updateInProgress(data:any) {
    console.log(data, "==> in progress") // WIP
    this.status = data.status;
    this.items[0].status = data
  }

  onScrollSpyChange(sectionId: Steps) {
    this.spyActive = sectionId;
  }

}
