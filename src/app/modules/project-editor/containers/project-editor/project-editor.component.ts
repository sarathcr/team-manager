import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProjectEntityService } from '../../services/project/project-entity.service';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Project } from 'src/app/shared/constants/project.model';
import { ProjectTitle } from '../../constants/title-data.model';
import { Observable } from 'rxjs';
import { StepStatusEntityService } from '../../services/step-status/step-status-entity.service';
import { StepId, Status } from '../../constants/step.model';
import { Step } from '../../constants/step.model';
import { steps } from '../../constants/step.data';

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.scss']
})
export class ProjectEditorComponent implements OnInit {
  project: Project;
  project$: Observable<Project>;
  notFound: boolean;
  titleData: ProjectTitle;
  projectUrl: any;
  steps: Step[] = [...steps];
  status: Status
  spyActive: StepId = 'stepOne'

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
        this.steps[0].name = translations['STEPS_MENU.project_structure_stepsmenu_startingpoint']
        this.steps[1].name = translations['STEPS_MENU.project_structure_stepsmenu_topic']
        this.steps[2].name = 'Objetivos competenciales' // WIP localization
        this.steps[3].name = 'Contenidos' // WIP localization
        this.steps[4].name = 'Evaluación' // WIP localization
        this.steps[5].name = translations['STEPS_MENU.project_structure_stepsmenu_creativetitle']
        this.steps[6].name = translations['STEPS_MENU.project_stepsmenu_drivingquestion']
        this.steps[7].name = translations['STEPS_MENU.project_structure_stepsmenu_finalproduct']
        this.steps[8].name = translations['STEPS_MENU.project_structure_stepsmenu_sinopsis']
        this.steps[8].name = 'Interacción con alumnos'  // WIP localization
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
  }

  handleFormSubmit(data: any) {
    this.handleSubmit(data.data)
  }

  // inprogress
  updateInProgress(data: any) {
    console.log(data, "==> in progress") // WIP
    this.status = data.status;
    // this.items[0].status = data
  }

  submitFormStatus(){
    // const formStatus: StepStatus = {
    //   id: this.project?.id,
    //   stepid: this.stepId,
    //   state: this.status
    // }
    // this.stepStatusService.add(formStatus)
  }

  onScrollSpyChange(sectionId: StepId) {
    this.spyActive = sectionId;
  }

}
