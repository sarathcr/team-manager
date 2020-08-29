import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import {
  Project,
  ProjectTitle,
  ProjectUpdate,
  statusId,
  Step,
  StepState,
} from 'src/app/modules/project-editor/constants/model/project.model'
import { SubSink } from 'src/app/shared/utility/subsink.utility'
import { Activity, ActivityState } from '../../constants/model/activity.model'
import { FormsData } from '../../constants/model/step-forms.model'
import { ProjectEntityService } from '../../store/entity/project/project-entity.service'
import { StepStatusEntityService } from '../../store/entity/step-status/step-status-entity.service'

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  projectId: number
  project$: Observable<Project>
  activities$: Observable<Activity[]>
  activity$: Observable<Activity>
  activityState$: ActivityState
  activity: Activity
  activityId: number
  project: Project
  step$: Observable<Step>
  notFound: boolean
  titleData: ProjectTitle
  steps: Step[]
  stepStatus$: Observable<StepState>
  tempStatus: any
  currentStepId: statusId
  nextStepId: statusId
  isStepDone: boolean
  currentStep$: BehaviorSubject<number> = new BehaviorSubject(1)
  loading$: Observable<boolean>
  loaded$: BehaviorSubject<boolean> = new BehaviorSubject(false)
  subscriptions = new SubSink()

  constructor(
    private projectsService: ProjectEntityService,
    private stepStatusService: StepStatusEntityService,
    private router: Router
  ) {}

  getProject(projectId: string | number): void {
    if (projectId !== 'create') {
      if (!/^\d+$/.test(projectId?.toString())) {
        // this.router.navigate(['not-found']) WIP Abijith
      } else {
        this.project$ = this.projectsService.entities$.pipe(
          map((projects) =>
            projects.find((project) => {
              return project.id === +projectId
            })
          )
        )
        this.activities$ = this.project$.pipe(
          map((project) => project?.activities)
        )
        this.subscriptions.sink = this.project$.subscribe((project) => {
          if (project) {
            this.projectId = project.id
            this.project = project
            this.notFound = false
            this.titleData = { id: project.id, title: project.title }
            this.getStepsStatus()
          } else {
            this.projectsService.getByKey(projectId.toString())
            this.notFound = true
          }
        })
      }
    }
    this.loading$ = this.projectsService.loading$
    this.subscriptions.sink = this.loading$.subscribe((loading) => {
      if (!loading) {
        this.loaded$.next(true)
      }
    })
  }

  selectActivity(activityId: number): void {
    this.activityId = activityId
    this.activity$ = this.activities$.pipe(
      map((activities) =>
        activities.find((activity) => {
          return activity.id === activityId
        })
      )
    )
    this.subscriptions.sink = this.activity$.subscribe(
      (activity) => (this.activity = activity)
    )
  }

  // filter data for each step
  getDataByStep(step: statusId): Observable<Project> {
    this.currentStepId = step
    this.currentStep$.next(step)
    if (this.project$) {
      return this.project$.pipe(
        map((data) => {
          switch (data && step) {
            case 1:
              return {
                country: data?.country
                  ? { id: data?.country.id, name: data?.country.name }
                  : null,
                region: data?.region
                  ? { id: data?.region.id, name: data?.region.name }
                  : null,
                academicYear: data?.academicYear
                  ? {
                      id: data?.academicYear.id,
                      academicYear: data?.academicYear?.academicYear,
                    }
                  : null,
                grades: data?.grades?.map(({ id, name }) => ({ id, name })),
                subjects: data?.subjects?.map(
                  ({ id, name, evaluationCriteria }) => ({
                    id,
                    name,
                    evaluationCriteria,
                  })
                ),
                stage: data.stage,
              }
            case 2:
              return {
                themes: data?.themes?.map(({ id, name }) => ({ id, name })),
              }
            case 3:
              return {
                ...data,
                grades: data?.grades?.map(({ id, name }) => ({ id, name })),
                academicYear: data?.academicYear,
                region: data?.region,
                subjects: data?.subjects?.map((subject) => ({
                  ...subject,
                  evaluationCriteria: subject?.evaluationCriteria?.map(
                    ({ id, name }) => ({ id, name })
                  ),
                })),
                competencyObjectives: data?.competencyObjectives?.map(
                  ({ id, name, standards, customStandards }) => {
                    return {
                      id,
                      name,
                      standards: standards?.map((standard) => standard),
                      customStandards: customStandards?.map(
                        (customStandard) => customStandard
                      ),
                    }
                  }
                ),
                evaluationCriteria: data?.evaluationCriteria?.map(
                  ({ id, name, subjectId, gradeId }) => ({
                    id,
                    name,
                    subjectId,
                    gradeId,
                  })
                ),
              }
            case 4:
              return {
                ...data,
                subjects: data?.subjects?.map((subject) => ({
                  ...subject,
                  contents: subject?.contents?.map(({ id, name }) => ({
                    id,
                    name,
                  })),
                  customContents: subject?.customContents?.map(
                    ({ id, name }) => ({ id, name })
                  ),
                  evaluationCriteria: subject?.evaluationCriteria?.map(
                    ({ id, name }) => ({ id, name })
                  ),
                })),
              }
            case 5:
              return {
                ...data,
                subjects: data?.subjects?.map((subject) => ({
                  ...subject,
                })),
                competencyObjectives: data?.competencyObjectives?.map(
                  (objective) => {
                    return {
                      ...objective,
                      standards: objective?.standards.map(
                        (standard) => standard
                      ),
                      customStandards: objective?.customStandards.map(
                        ({ id, name }) => ({
                          id,
                          name,
                        })
                      ),
                    }
                  }
                ),
              }
            case 6:
              return {
                creativeImage: data.creativeImage,
                creativeTitle: data.creativeTitle,
              }
            case 7:
              return {
                drivingQuestions: data?.drivingQuestions?.map(
                  ({ id, name }) => ({ id, name })
                ),
              }
            case 8:
              return { finalProduct: data.finalProduct }
            case 9:
              return { synopsis: data.synopsis }
          }
        })
      )
    }
  }

  private getStepsStatus(): void {
    // status state management
    this.stepStatus$ = this.stepStatusService.entities$.pipe(
      map((stepStates) =>
        stepStates.find((state) => {
          return state.id === +this.projectId
        })
      )
    )
    this.subscriptions.sink = this.stepStatus$.subscribe((data) => {
      if (data) {
        this.updateStepStatus(data)
      } else {
        if (this.projectId) {
          this.stepStatusService.getWithQuery(this.projectId.toString())
        }
      }
    })
  }

  // filter status for each step
  getStepStatus(stepId?: number): Observable<Step> {
    const currentStepId = stepId ? stepId : this.currentStepId
    this.stepStatus$ = this.stepStatusService.entities$.pipe(
      map((stepStates) =>
        stepStates.find((state) => {
          return state.id === +this.projectId
        })
      )
    )
    if (this.stepStatus$) {
      return this.stepStatus$.pipe(
        map((data) => data?.steps.find((item) => item.stepid === currentStepId))
      )
    }
  }

  private updateStepStatus(stepstatus: any): void {
    for (const newState of stepstatus.steps) {
      for (const step of this.steps) {
        if (
          step.stepid === newState.stepid &&
          stepstatus.id === this.projectId
        ) {
          step.state = newState.state
        }
      }
    }
  }

  handleSubmit(projectData: object): void {
    if (!this.projectId) {
      // create mode
      const newProject = {
        title: '',
        ...projectData,
      }
      const browserUrl = this.router.url
      this.subscriptions.sink = this.projectsService
        .add(newProject)
        .subscribe((newResProject) => {
          if (browserUrl.includes('create')) {
            this.router.navigate([
              `editor/project/${newResProject.id}/${this.currentStepId}`,
            ])
          }
          this.projectId = newResProject.id
          this.getProject(this.projectId)
          this.handleNavigate()
          if (this.tempStatus) {
            this.tempStatus.id = newResProject.id
            this.stepStatusService.update(this.tempStatus)
            this.tempStatus = null
          }
        })
    } else {
      // update mode
      const updateProject = {
        id: this.projectId,
        ...projectData,
      }
      this.projectsService.update(updateProject)
    }
  }

  handleActivitySubmit(activity: Activity): void {
    const project: ProjectUpdate = {
      ...this.project,
      activityId: activity.id ? activity.id : null,
    }
    project.activities = Object.assign([], project.activities)
    switch (activity.updateType) {
      case 'create':
        // managing the create and clone activity here..
        // maybe in the future, we can use clone API separately if it's required
        project.updateType = 'createActivity'
        project.activities.push({ ...activity, id: null })
        this.projectsService.update(project)
        break
      case 'delete':
        project.activities = this.project.activities.filter(
          (acvty) => acvty.id !== activity.id
        )
        project.updateType = 'deleteActivity'
        this.projectsService.update(project)
        break
      default:
        // this case is for update activity
        project.activities = this.project.activities.map((acvty) =>
          acvty.id === activity.id ? activity : acvty
        )
        project.updateType = 'updateActivity'

        this.projectsService.update(project)
        break
    }
  }

  handleStepSubmit(data: FormsData, isDone: boolean = false): void {
    this.handleSubmit(data.data)
    this.submitStepStatus(data.stepStatus)
    this.isStepDone = isDone
    this.handleNavigate()
  }

  private submitStepStatus(data: any): void {
    if (this.projectId) {
      const dataWithId: StepState = {
        ...data,
        id: this.projectId,
      }
      this.stepStatusService.update(dataWithId)
    } else {
      this.tempStatus = data
    }
  }

  // Navigates to next step after a 1s delay
  private handleNavigate(): void {
    this.getNextSectionId()
    if (this.isStepDone) {
      if (this.projectId && this.currentStepId !== this.nextStepId) {
        setTimeout(() => {
          this.redirectToStep(this.nextStepId)
        }, 1000)
      }
    }
  }

  // Finds the next step sectionId
  private getNextSectionId(): void {
    for (const [index, step] of this.steps.entries()) {
      if (step.stepid === this.currentStepId) {
        if (step.stepid < 10) {
          this.nextStepId = this.steps[index + 1].stepid
        } else {
          this.nextStepId = step.stepid
        }
      }
    }
  }

  clearData(): void {
    this.subscriptions.unsubscribe()
    this.project$ = null
    this.stepStatus$ = null
    this.titleData = null
    this.projectId = null
    this.currentStepId = null
    this.nextStepId = null
    this.isStepDone = false
    this.loaded$.next(false)
    this.steps = []
  }

  createSteps(): Step[] {
    if (!this.steps?.length) {
      this.steps = [
        {
          stepid: 1,
          state: 'PENDING',
          name: 'STEPS_MENU.project_structure_stepsmenu_startingpoint',
        },
        {
          stepid: 2,
          state: 'PENDING',
          name: 'STEPS_MENU.project_structure_stepsmenu_topic',
        },
        {
          stepid: 3,
          state: 'PENDING',
          name: 'STEPS_MENU.project_structure_stepsmenu_objectives',
        },
        { stepid: 4, state: 'PENDING', name: 'Contenidos' },
        {
          stepid: 5,
          state: 'PENDING',
          name: 'STEPS_MENU.project_structure_stepsmenu_standards',
        },
        {
          stepid: 6,
          state: 'PENDING',
          name: 'STEPS_MENU.project_structure_stepsmenu_creativetitle',
        },
        {
          stepid: 7,
          state: 'PENDING',
          name: 'STEPS_MENU.project_stepsmenu_drivingquestion',
        },
        {
          stepid: 8,
          state: 'PENDING',
          name: 'STEPS_MENU.project_structure_stepsmenu_finalproduct',
        },
        {
          stepid: 9,
          state: 'PENDING',
          name: 'STEPS_MENU.project_structure_stepsmenu_sinopsis',
        },
        { stepid: 10, state: 'PENDING', name: 'Interacción' },
      ]
    }
    return this.steps
  }

  redirectToStep(id: number): void {
    if (id && id - this.currentStepId === 1) {
      this.router.navigate([`editor/project/${this.projectId}/${id}`])
    }
  }
}
