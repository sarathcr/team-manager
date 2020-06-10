import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { StepState, StepId, Steps, statusId, Step } from '../../constants/step.model';
import { TranslateService } from '@ngx-translate/core';
import { Project } from 'src/app/shared/constants/project.model';
import { Observable } from 'rxjs';
import { ProjectEntityService } from '../project/project-entity.service';
import { map } from 'rxjs/operators';
import { ProjectTitle } from '../../constants/title-data.model';
import { StepStatusEntityService } from '../step-status/step-status-entity.service';
import { FormOne } from '../../constants/step-forms.model';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  projectId: number;
  project$: Observable<Project>;
  notFound: boolean;
  titleData: ProjectTitle;
  steps: Steps;
  stepStatus$: Observable<StepState>;
  tempStatus: any;

  constructor(
    private projectsService: ProjectEntityService,
    private translate: TranslateService,
    private stepStatusService: StepStatusEntityService,
    private location: Location,
  ) { }

  getProject(projectId) {
    if (projectId !== 'create') {
      this.project$ = this.projectsService.entities$
        .pipe(
          map(projects => projects.find(project => {
            return project.id === +(projectId)
          }))
        )
      this.project$.subscribe(project => {
        if (project) {
          this.projectId = project.id;
          this.notFound = false;
          this.titleData = { id: project.id, title: project.title }
          this.getStepsStatus()
        } else {
          this.projectsService.getByKey(projectId.toString());
          this.notFound = true;
        }
      })
    }
    else this.project$ = null
  }

  getStepData(step: StepId) {
    if(this.project$) {
      return this.project$.pipe(map(
        (data) => {
          switch(data && step) {
            case 'stepOne':
              return ({
                country: data?.country ? { id: data?.country.id, name: data?.country.name } : null,
                region: data?.region ? { id: data?.region.id, name: data?.region.name } : null,
                academicYear: data?.academicYear ? { id: data?.academicYear.id, academicYear: data?.academicYear?.academicYear } : null,
                grades: data?.grades.map(({ id, name}) => ({ id, name })),
                subjects: data?.subjects.map(({ id, name}) => ({ id, name }))
              })
          }
        }
      ))
    }
  }

  getStepsStatus() {
    // status state management
    this.stepStatus$ = this.stepStatusService.entities$
      .pipe(
        map(stepStates => stepStates.find(state => {
          return state.id === Number(this.projectId);
        }))
      )
    this.stepStatus$.subscribe(data => {
      if (data) {
        this.updateStepStatus(data)
      } else {
        this.stepStatusService.getWithQuery(this.projectId.toString())
      }
    })
  }

  getStepStatus(stepId: statusId): Observable<Step> {
    this.stepStatus$ = this.stepStatusService.entities$
      .pipe(
        map(stepStates => stepStates.find(state => {
          return state.id === +(this.projectId);
        }))
      )
    if(this.stepStatus$) {
      return this.stepStatus$.pipe(map(data => (
        data?.steps.find(item => item.stepid == stepId)
      )))
    }
  }

  updateStepStatus(stepstatus: any) {
    for(const newState of stepstatus.steps) {
      for (const step in this.steps) {
        if (this.steps[step].stepid == newState.stepid) {
          this.steps[step].state = newState.state
        }
      }
    }
  }

  handleSubmit(projectData: object) {
    if (!this.projectId) {
      // create mode
      const newProject = {
        title: '',
        ...projectData
      }
      this.projectsService.add(newProject)
        .subscribe(
          newResProject => {
            this.location.go('editor/project/' + newResProject.id)
            this.projectId = newResProject.id
            this.getProject(this.projectId);
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
        id: this.projectId,
        ...projectData
      }
      this.projectsService.update(updateProject);
    }
  }

  handleFormSubmit(data: FormOne) {
    this.handleSubmit(data.data)
    this.submitFormStatus(data.stepStatus)
  }

  submitFormStatus(data: any) {
    if (this.projectId) {
      const dataWithId: StepState = {
        ...data,
        id: this.projectId
      }
      this.stepStatusService.update(dataWithId)
    } else {
      this.tempStatus = data;
    }
  }

  createSteps(): Steps {
    this.steps = {
      one: { sectionid: 'stepOne', stepid: 1, state: 'PENDING', name: '' },
      two: { sectionid: 'stepTwo', stepid: 2, state: 'PENDING', name: '' },
      three: { sectionid: 'stepThree', stepid: 3, state: 'PENDING', name: '' },
      four: { sectionid: 'stepFour', stepid: 4, state: 'PENDING', name: '' },
      five: { sectionid: 'stepFive', stepid: 5, state: 'PENDING', name: '' },
      six: { sectionid: 'stepSix', stepid: 6, state: 'PENDING', name: '' },
      seven: { sectionid: 'stepSeven', stepid: 7, state: 'PENDING', name: '' },
      eight: { sectionid: 'stepEight', stepid: 8, state: 'PENDING', name: '' },
      nine: { sectionid: 'stepNine', stepid: 9, state: 'PENDING', name: '' },
      ten: { sectionid: 'stepTen', stepid: 10, state: 'PENDING', name: '' },
    }
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
        this.steps.one.name = translations['STEPS_MENU.project_structure_stepsmenu_startingpoint']
        this.steps.two.name = translations['STEPS_MENU.project_structure_stepsmenu_topic']
        this.steps.three.name = 'Objetivos competenciales' // WIP localization
        this.steps.four.name = 'Contenidos' // WIP localization
        this.steps.five.name = 'Estándares' // WIP localization
        this.steps.six.name = translations['STEPS_MENU.project_structure_stepsmenu_creativetitle']
        this.steps.seven.name = translations['STEPS_MENU.project_stepsmenu_drivingquestion']
        this.steps.eight.name = translations['STEPS_MENU.project_structure_stepsmenu_finalproduct']
        this.steps.nine.name = translations['STEPS_MENU.project_structure_stepsmenu_sinopsis']
        this.steps.ten.name = 'Interacción'  // WIP localization
      }
    );
    return this.steps;
  }
}
