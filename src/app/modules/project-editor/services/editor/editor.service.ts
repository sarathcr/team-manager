import { Injectable } from '@angular/core';
import { StepState, StepId, Steps, statusId, Step } from '../../constants/step.model';
import { TranslateService } from '@ngx-translate/core';
import { Project } from 'src/app/shared/constants/project.model';
import { Observable } from 'rxjs';
import { ProjectEntityService } from '../project/project-entity.service';
import { map } from 'rxjs/operators';
import { ProjectTitle } from '../../constants/title-data.model';
import { StepStatusEntityService } from '../step-status/step-status-entity.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  projectId: number;
  project$: Observable<Project>;
  step$: Observable<Step>
  notFound: boolean;
  titleData: ProjectTitle;
  steps: Steps;
  stepStatus$: Observable<StepState>;
  tempStatus: any;
  currentSectionId: StepId
  nextSectionId: StepId
  isStepDone: boolean

  constructor(
    private projectsService: ProjectEntityService,
    private translate: TranslateService,
    private stepStatusService: StepStatusEntityService,
    private router: Router
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
  }

  // filter data for each step
  getStepData(step: StepId) {
    this.currentSectionId = step
    if (this.project$) {
      return this.project$.pipe(map(
        (data) => {
          switch (data && step) {
            case 'stepOne':
              return ({
                country: data?.country ? { id: data?.country.id, name: data?.country.name } : null,
                region: data?.region ? { id: data?.region.id, name: data?.region.name } : null,
                academicYear: data?.academicYear ? { id: data?.academicYear.id, academicYear: data?.academicYear?.academicYear } : null,
                grades: data?.grades?.map(({ id, name }) => ({ id, name })),
                subjects: data?.subjects?.map(({ id, name }) => ({ id, name }))
              })
            case 'stepTwo': return data?.themes?.map(({ id, name }) => ({ id, name }))
            case 'stepSeven': return data?.drivingQuestions?.map(({ id, name }) => ({ id, name }))
            case 'stepEight': return { finalProduct: data.finalProduct }
            case 'stepNine': return { synopsis: data.synopsis }
          }
        }
      ))
    }
  }

  private getStepsStatus() {
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

  // filter status for each step
  getStepStatus(stepId: statusId): Observable<Step> {
    this.stepStatus$ = this.stepStatusService.entities$
      .pipe(
        map(stepStates => stepStates.find(state => {
          return state.id === +(this.projectId);
        }))
      )
    if (this.stepStatus$) {
      return this.stepStatus$.pipe(map(data => (
        data?.steps.find(item => item.stepid == stepId)
      )))
    }
  }

  private updateStepStatus(stepstatus: any) {
    for (const newState of stepstatus.steps) {
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
      const browserUrl = this.router.url
      this.projectsService.add(newProject)
        .subscribe(
          newResProject => {
            if (browserUrl.includes('create')) {
              this.router.navigate([`editor/project/${newResProject.id}/${this.currentSectionId}`])
            }
            this.projectId = newResProject.id
            this.getProject(this.projectId);
            this.handleNavigate()
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

  handleStepSubmit(data, isDone = false) {
    this.handleSubmit(data.data)
    this.submitStepStatus(data.stepStatus)
    this.isStepDone = isDone
    this.handleNavigate()
  }

  private submitStepStatus(data: any) {
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

  // Navigates to next step after a 1s delay
  private handleNavigate() {
    this.getNextSectionId()
    if (this.isStepDone) {
      if (this.projectId && this.currentSectionId != this.nextSectionId) {
        setTimeout(() => {
          this.router.navigate([`editor/project/${this.projectId}/${this.nextSectionId}`])
        }, 1000);
      }
    }
  }

  //Finds the next step sectionId
  private getNextSectionId() {
    const stepkeys = Object.keys(this.steps)
    stepkeys.forEach((step, index) => {
      if (this.steps[step].sectionid === this.currentSectionId) {
        if (this.steps[step].stepid < 10) {
          stepkeys.forEach(stepData => {
            if (this.steps[stepData].stepid == this.steps[step].stepid + 1) {
              this.nextSectionId = this.steps[stepData].sectionid
            }
          })
        } else {
          this.nextSectionId = this.steps[step].sectionid
        }
      }
    })
  }

  clearData() {
    this.projectId = null
    this.project$ = null
    this.titleData = null
    this.stepStatus$ = null
    this.tempStatus = null
    this.currentSectionId = null
    this.nextSectionId = null
    this.isStepDone = null
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
