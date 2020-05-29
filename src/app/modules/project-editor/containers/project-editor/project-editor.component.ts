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
import { StepStatusEntityService } from '../../services/step-status/step-status-entity.service';
import { StepStatus } from '../../constants/step-status.model';
import { Steps } from '../../constants/steps.model';

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.scss']
})
export class ProjectEditorComponent implements OnInit {
  project: Project;
  project$: Observable<Project>;
  formStatus$: Observable<any>
  notFound: boolean;
  titleData: TitleData;
  projectUrl: any;
  items: StepMenu[];
  status: 'INPROCESS' | 'DONE' | 'PENDING';
  stepId: number
  spyActive: Steps = 'stepOne'

  constructor(
    private projectsService: ProjectEntityService,
    private route: ActivatedRoute,
    private location: Location,
    private translate: TranslateService,
    private stepStatusService: StepStatusEntityService
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
          { id: 1, name: translations['STEPS_MENU.project_structure_stepsmenu_startingpoint'], status: 'PENDING' },
          { id: 2, name: translations['STEPS_MENU.project_structure_stepsmenu_topic'], status: 'PENDING' },
          { id: 3, name: 'Objetivos competenciales', status: 'PENDING' }, // add localization
          { id: 4, name: 'Contenidos', status: 'PENDING' }, // add localization
          { id: 5, name: 'Evaluación', status: 'PENDING' }, // add localization
          { id: 6, name: translations['STEPS_MENU.project_structure_stepsmenu_creativetitle'], status: 'PENDING' },
          { id: 7, name: translations['STEPS_MENU.project_stepsmenu_drivingquestion'], status: 'PENDING' },
          { id: 8, name: translations['STEPS_MENU.project_structure_stepsmenu_finalproduct'], status: 'PENDING' },
          { id: 9, name: translations['STEPS_MENU.project_structure_stepsmenu_sinopsis'], status: 'PENDING' },
          { id: 10, name: 'Interacción con alumnos', status: 'PENDING' } // add localization
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
            this.submitFormStatus();
          }
        );
    } else {
      // update mode
      const updateProject = {
        id: this.project.id,
        ...projectData
      }
      this.projectsService.update(updateProject);
      this.submitFormStatus();
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
          this.stepStatusService.getWithQuery(project.id.toString())
        } else {
          // WIP
          // this.projectsService.getWithQuery(`/projects/${this.projectUrl.toString()}`);
          this.notFound = true;
        }
      })
    }
    // this.formStatus$ = this.stepStatusService.entities$
  }

  handleFormSubmit(data: any) {
    this.status = data.status;
    this.stepId = data.stepid
    this.handleSubmit(data.data)
  }

  // inprogress
  updateInProgress(data: any) {
    console.log(data, "==> in progress") // WIP
    this.status = data.status;
    this.items[0].status = data
  }

  // function to submit form status
  submitFormStatus() {
    if (this.stepId && this.status) {
      const formStatus: StepStatus = {
        id: this.project?.id,
        stepid: this.stepId,
        state: this.status
      }
      this.stepStatusService.add(formStatus)
    }
  }

  onScrollSpyChange(sectionId: Steps) {
    this.spyActive = sectionId;
  }

}
