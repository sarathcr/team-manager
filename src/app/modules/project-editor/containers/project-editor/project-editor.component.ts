import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProjectEntityService } from '../../services/project/project-entity.service';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Project } from 'src/app/shared/constants/project.model';
import { ProjectTitle } from '../../constants/title-data.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { StepStatusEntityService } from '../../services/step-status/step-status-entity.service';
import { StepId, Status, StepState } from '../../constants/step.model';
import { Step } from '../../constants/step.model';
import { FormOne } from '../../constants/step-forms.model';

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.scss']
})
export class ProjectEditorComponent implements OnInit {
  project: Project;
  project$: Observable<Project>;
  spyActive$ = new BehaviorSubject<StepId>('stepOne')
  stepStatus$: Observable<StepState>
  notFound: boolean;
  titleData: ProjectTitle;
  projectUrl: any;
  steps: Step[]
  status: Status
  tempStatus: any // saving the status for non created projects
  contextualStatus: boolean = false

  constructor(
    private projectsService: ProjectEntityService,
    private route: ActivatedRoute,
    private location: Location,
    private translate: TranslateService,
    private stepStatusService: StepStatusEntityService
  ) { }

  ngOnInit(): void {
    this.createSteps()
    this.projectUrl = this.route.snapshot.paramMap.get('id');
    this.getProject()
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
            this.getProject();
            if (this.tempStatus) {
              this.tempStatus.id = newResProject.id
              this.stepStatusService.update(this.tempStatus)
              this.tempStatus = null
            }
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

  getProject() {
    if (this.projectUrl !== 'create') {
      this.project$ = this.projectsService.entities$
        .pipe(
          map(projects => projects.find(project => {
            return project.id === Number(this.projectUrl)
          }))
        )
      this.project$.subscribe(project => {
        this.project = project;
        if (project) {
          this.notFound = false;
          this.titleData = { id: project.id, title: project.title }
          this.getStepStatus(project.id)
        } else {
          // WIP
          // this.projectsService.getWithQuery(`/projects/${this.projectUrl.toString()}`);
          this.notFound = true;
        }
      })
    }
  }

  getStepStatus(projectId: number) {
    // status state management
    this.stepStatus$ = this.stepStatusService.entities$
      .pipe(
        map(stepStates => stepStates.find(state => {
          return state.id === Number(this.projectUrl);
        }))
      )
    this.stepStatus$.subscribe(data => {
      if (data) {
        this.updateStepStatus(data)
      } else {
        this.stepStatusService.getWithQuery(projectId.toString())
      }
    })
  }

  updateStepStatus(stepstatus: any) {
    stepstatus.steps?.forEach(newState => {
      this.steps.forEach(step => {
        if (step.stepid == newState.stepid) {
          step.state = newState.state
        }
      });
    });
  }

  handleFormSubmit(data: FormOne) {
    this.handleSubmit(data.data)
    this.submitFormStatus(data.stepStatus)
  }

  submitFormStatus(data: any) {
    if (this.project && this.project.id) {
      const dataWithId: StepState = {
        ...data,
        id: this.project.id
      }
      this.stepStatusService.update(dataWithId)
    } else {
      this.tempStatus = data;
    }
  }

  onScrollSpyChange(sectionId: StepId) {
    this.spyActive$.next(sectionId);
  }

  createSteps() {
    this.steps = [
      { sectionid: 'stepOne', stepid: 1, state: 'PENDING', name: '' },
      { sectionid: 'stepTwo', stepid: 2, state: 'PENDING', name: '' },
      { sectionid: 'stepThree', stepid: 3, state: 'PENDING', name: '' },
      { sectionid: 'stepFour', stepid: 4, state: 'PENDING', name: '' },
      { sectionid: 'stepFive', stepid: 5, state: 'PENDING', name: '' },
      { sectionid: 'stepSix', stepid: 6, state: 'PENDING', name: '' },
      { sectionid: 'stepSeven', stepid: 7, state: 'PENDING', name: '' },
      { sectionid: 'stepEight', stepid: 8, state: 'PENDING', name: '' },
      { sectionid: 'stepNine', stepid: 9, state: 'PENDING', name: '' },
      { sectionid: 'stepTen', stepid: 10, state: 'PENDING', name: '' }
    ]
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
        this.steps[4].name = 'Estándares' // WIP localization
        this.steps[5].name = translations['STEPS_MENU.project_structure_stepsmenu_creativetitle']
        this.steps[6].name = translations['STEPS_MENU.project_stepsmenu_drivingquestion']
        this.steps[7].name = translations['STEPS_MENU.project_structure_stepsmenu_finalproduct']
        this.steps[8].name = translations['STEPS_MENU.project_structure_stepsmenu_sinopsis']
        this.steps[9].name = 'Interacción'  // WIP localization
      }
      );
  }

  getContextualStatus($event) {
    this.contextualStatus = $event
  }

}
