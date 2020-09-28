import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { UserService } from 'src/app/modules/auth/services/user/user.service'

import {
  Project,
  ProjectTitle,
  ProjectUpdate,
  statusId,
  Step,
  StepState,
  Type,
} from 'src/app/modules/project-editor/constants/model/project.model'
import { StorageService } from 'src/app/shared/services/storage/storage.service'
import { unfreeze } from 'src/app/shared/utility/object.utility'
import { SubSink } from 'src/app/shared/utility/subsink.utility'
import {
  Activity,
  ActivityState,
  Exercise,
} from '../../constants/model/activity.model'
import { FormsData } from '../../constants/model/step-forms.model'
import { ProjectListEntityService } from '../../store/entity/project-list/project-list-entity.service'
import { ProjectEntityService } from '../../store/entity/project/project-entity.service'
import { StepStatusEntityService } from '../../store/entity/step-status/step-status-entity.service'

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  experienceId: number
  experienceType: Type
  project$: Observable<Project>
  activities$: Observable<Activity[]>
  activity$: Observable<Activity>
  activityState$: ActivityState
  activity: Activity
  activityId: number
  private project: Project
  step$: Observable<Step>
  notFound: boolean
  titleData: ProjectTitle
  steps: Step[]
  stepStatus$: Observable<StepState>
  tempStatus: any
  currentStepId: statusId
  currentUrl: string
  nextStepId: statusId
  isStepDone: boolean
  currentStep$: BehaviorSubject<number> = new BehaviorSubject(1)
  loading$: Observable<boolean>
  loaded$: BehaviorSubject<boolean> = new BehaviorSubject(false)
  subscriptions = new SubSink()
  activitySubscription = new SubSink()

  constructor(
    private projectsService: ProjectEntityService,
    private projectListService: ProjectListEntityService,
    private stepStatusService: StepStatusEntityService,
    private router: Router,
    private userService: UserService
  ) {}

  getProject(experienceId: string | number, type?: Type): void {
    if (type) {
      this.experienceType = type
    }
    if (experienceId !== 'create') {
      if (!/^\d+$/.test(experienceId?.toString())) {
        this.router.navigate(['not-found'])
      } else {
        this.project$ = this.projectsService.entities$.pipe(
          map((projects) =>
            projects.find((project) => {
              return project.id === +experienceId
            })
          )
        )
        this.activities$ = this.project$.pipe(
          map((project) => project?.activities)
        )
        this.subscriptions.sink = this.project$.subscribe((project) => {
          if (project) {
            if (
              project.type.split('_').join('-').toLowerCase() ===
              this.getExperienceUrl()
            ) {
              this.experienceId = project.id
              this.project = project
              this.notFound = false
              this.titleData = { id: project.id, title: project.title }
              this.getStepsStatus()
            } else {
              this.router.navigate(['not-found'])
            }
          } else {
            this.notFound = true
          }
        })
        this.projectsService.getByKey(experienceId.toString())
      }
    }
    this.loading$ = this.projectsService.loading$
    this.subscriptions.sink = this.loading$.subscribe((loading) => {
      if (!loading) {
        this.loaded$.next(true)
      }
    })
    this.projectListService.clearCache() // To clear project list store
  }

  selectActivity(activityId: number): void {
    this.activityId = activityId
    this.activity$ = this.activities$.pipe(
      map((activities) =>
        activities?.find((activity) => {
          return activity.id === activityId
        })
      )
    )
    this.activitySubscription.sink = this.activity$.subscribe(
      (activity) => (this.activity = activity)
    )
  }

  setContextualhelpStep(step: number): void {
    this.currentStep$.next(step)
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
                  ({
                    id,
                    name,
                    evaluationCriteria,
                    contents,
                    customContents,
                  }) => ({
                    id,
                    name,
                    evaluationCriteria,
                    contents,
                    customContents,
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
              if (this.experienceType === 'PROJECT') {
                return {
                  creativeImage: data.creativeImage,
                  creativeTitle: data.creativeTitle,
                }
              } else if (this.experienceType === 'DIDACTIC_UNIT') {
                return {
                  synopsis: data.synopsis,
                  synopsisImage: data.creativeImage,
                }
              } else {
                break
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
          return state.id === +this.experienceId
        })
      )
    )
    this.subscriptions.sink = this.stepStatus$.subscribe((data) => {
      if (data) {
        this.updateStepStatus(data)
      } else {
        if (this.experienceId) {
          this.stepStatusService.getWithQuery(this.experienceId.toString())
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
          return state.id === +this.experienceId
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
          stepstatus.id === this.experienceId
        ) {
          step.state = newState.state
        }
      }
    }
  }

  handleSubmit(projectData: object): void {
    if (!this.experienceId) {
      // create mode
      const newProject = {
        title: '',
        ...projectData,
        type: this.experienceType,
        userIdLoggedIn: this.userService.getUserId(), // userId
      }
      const browserUrl = this.router.url
      this.subscriptions.sink = this.projectsService
        .add(newProject)
        .subscribe((newResProject) => {
          if (browserUrl.includes('create')) {
            this.router.navigate([
              `editor/${this.getExperienceUrl()}/${newResProject.id}/${
                this.currentStepId
              }`,
            ])
          }
          this.experienceId = newResProject.id
          this.getProject(this.experienceId)
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
        id: this.experienceId,
        ...projectData,
        type: this.experienceType,
        userIdLoggedIn: this.userService.getUserId(), // userId
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
        this.subscriptions.sink = this.projectsService
          .update(project)
          .subscribe((response) => {
            this.router.navigate([
              `/editor/project/${response.id}/activity/${response.activityCreated}/definition`,
            ])
          })
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

  handleExerciseSubmit(exercise: Exercise): void {
    const project: ProjectUpdate = unfreeze({
      ...this.project,
      activityId: this.activityId,
    })
    switch (exercise.updateType) {
      case 'create':
        delete exercise.updateType
        project.updateType = 'createExercise'
        for (const activity of project.activities) {
          if (activity.id === this.activityId) {
            if (activity.exercises) {
              activity.exercises.push({ ...exercise, id: null })
            } else {
              activity.exercises = [{ ...exercise, id: null }]
            }
          }
        }
        project.exercise = exercise
        this.projectsService.update(project)
        break
      case 'delete':
        break
      case 'update':
        break
      default:
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
    if (this.experienceId) {
      const dataWithId: StepState = {
        ...data,
        id: this.experienceId,
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
      if (this.experienceId && this.currentStepId !== this.nextStepId) {
        this.currentUrl = this.router.url
        setTimeout(() => {
          this.redirectToStep(this.nextStepId, 'formSubmission')
        }, 1000)
      }
    }
  }

  // Finds the next step sectionId
  private getNextSectionId(): void {
    for (const [index, step] of this.steps.entries()) {
      if (step.stepid === this.currentStepId) {
        if (step.stepid < this.steps?.length) {
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
    this.activities$ = null
    this.activity$ = null
    this.project = null
    this.activity = null
    this.stepStatus$ = null
    this.titleData = null
    this.experienceId = null
    this.currentStepId = null
    this.nextStepId = null
    this.isStepDone = false
    this.loaded$.next(false)
    this.steps = []
    this.clearActivityData()
  }

  clearActivityData(): void {
    this.activitySubscription.unsubscribe()
  }

  createSteps(experienceType?: Type): Step[] {
    if (!this.steps?.length) {
      if (experienceType === 'PROJECT') {
        this.steps = [
          {
            stepid: 1,
            state: 'PENDING',
            name: 'STEPS_MENU.project_structure_stepsmenu_startingpoint',
          },
          {
            stepid: 2,
            state: 'PENDING',
            name: 'STEPS_MENU.project_structure_stepsmenu_thematic',
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
        ]
      } else if (experienceType === 'DIDACTIC_UNIT') {
        this.steps = [
          {
            stepid: 1,
            state: 'PENDING',
            name: 'STEPS_MENU.project_structure_stepsmenu_startingpoint',
          },
          {
            stepid: 2,
            state: 'PENDING',
            name: 'STEPS_MENU.project_structure_stepsmenu_thematic',
          },
          {
            stepid: 3,
            state: 'PENDING',
            name: 'STEPS_MENU.project_structure_stepsmenu_objectives',
          },
          {
            stepid: 4,
            state: 'PENDING',
            name: 'Contenidos',
          },
          {
            stepid: 5,
            state: 'PENDING',
            name: 'STEPS_MENU.project_structure_stepsmenu_standards',
          },
          {
            stepid: 6,
            state: 'PENDING',
            name: 'STEPS_MENU.project_structure_stepsmenu_sinopsis',
          },
        ]
      }
    }
    return this.steps
  }

  redirectToStep(nextStepId: number, redirectType?: 'formSubmission'): void {
    if (nextStepId) {
      if (redirectType && redirectType === 'formSubmission') {
        const intermediateUrl = this.router.url // if user switches to another route inbetween
        if (this.currentUrl === intermediateUrl) {
          this.router.navigate([
            `editor/${this.getExperienceUrl()}/${
              this.experienceId
            }/${nextStepId}`,
          ])
        }
      } else {
        this.router.navigate([
          `editor/${this.getExperienceUrl()}/${
            this.experienceId
          }/${nextStepId}`,
        ])
      }
    }
  }
  // Get localization Index based on Experiance Type
  getLocalExperienceType(): number {
    return this.experienceType === 'PROJECT'
      ? 0
      : this.experienceType === 'DIDACTIC_UNIT'
      ? 1
      : this.experienceType === 'ACTIVITY'
      ? 2
      : null
  }

  getExperienceUrl(): string {
    return this.experienceType.split('_').join('-').toLowerCase()
  }
}
