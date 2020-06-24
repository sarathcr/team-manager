import { Injectable } from '@angular/core'
import { StepState, statusId, Step } from '../../constants/step.model'
import { TranslateService } from '@ngx-translate/core'
import { Project } from 'src/app/modules/project-editor/constants/project.model'
import { Observable, Subscription, BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'
import { ProjectTitle } from '../../constants/title-data.model'
import { Router } from '@angular/router'
import { ProjectEntityService } from '../../store/entity/project/project-entity.service'
import { StepStatusEntityService } from '../../store/entity/step-status/step-status-entity.service'
import { steps } from '../../constants/step.data'

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  projectId: number
  project$: Observable<Project>
  step$: Observable<Step>
  notFound: boolean
  titleData: ProjectTitle
  steps: Step[]
  stepStatus$: Observable<StepState>
  tempStatus: any
  currentSectionId: statusId
  nextSectionId: statusId
  isStepDone: boolean
  currentStep$: BehaviorSubject<number> = new BehaviorSubject(1)
  projectSubscription: Subscription
  statusSubscription: Subscription
  loading: boolean
  loading$: Observable<boolean>

  constructor(
    private projectsService: ProjectEntityService,
    private translate: TranslateService,
    private stepStatusService: StepStatusEntityService,
    private router: Router
  ) { }

  getProject(projectId): void {
    if (projectId !== 'create') {
      this.project$ = this.projectsService.entities$
        .pipe(
          map(projects => projects.find(project => {
            return project.id === +(projectId)
          }))
        )
      this.projectSubscription = this.project$.subscribe(project => {
        if (project) {
          this.projectId = project.id
          this.notFound = false
          this.titleData = { id: project.id, title: project.title }
          this.getStepsStatus()
        } else {
          this.projectsService.getByKey(projectId.toString())
          this.notFound = true
        }
      })
    }
    this.loading$ = this.projectsService.loading$
    this.loading$.subscribe(res => {
      this.loading = res
    })
  }

  // filter data for each step
  getStepData(step: statusId): Observable<any> {
    this.currentSectionId = step
    if (this.project$) {
      return this.project$.pipe(map(
        (data) => {
          switch (data && step) {
            case 1:
              return ({
                country: data?.country ? { id: data?.country.id, name: data?.country.name } : null,
                region: data?.region ? { id: data?.region.id, name: data?.region.name } : null,
                academicYear: data?.academicYear ? {
                  id: data?.academicYear.id,
                  academicYear: data?.academicYear?.academicYear
                } : null,
                grades: data?.grades?.map(({ id, name }) => ({ id, name })),
                subjects: data?.subjects?.map(({ id, name }) => ({ id, name }))
              })
            case 2: return data?.themes?.map(({ id, name }) => ({ id, name }))
            case 3: return ({
              subjects: data?.subjects?.map(({ id, name }) => ({ id, name })),
              competencyObjectives: data?.competencyObjectives?.map(({ id, name }) => ({ id, name })),
              evaluationCriteria: data?.evaluationCriteria?.map(({ id, name, subjectId, gradeId }) => (
                { id, name, subjectId, gradeId }))
            })
            case 6: return {
              creativeImage: data.creativeImage,
              creativeTitle: data.creativeTitle,
            }
            case 7: return data?.drivingQuestions?.map(({ id, name }) => ({ id, name }))
            case 8: return { finalProduct: data.finalProduct }
            case 9: return { synopsis: data.synopsis }
          }
        }
      ))
    }
  }

  private getStepsStatus(): void {
    // status state management
    this.stepStatus$ = this.stepStatusService.entities$
      .pipe(
        map(stepStates => stepStates.find(state => {
          return state.id === Number(this.projectId)
        }))
      )
    this.statusSubscription = this.stepStatus$.subscribe(data => {
      if (data) {
        this.updateStepStatus(data)
      } else {
        if (this.projectId) { this.stepStatusService.getWithQuery(this.projectId.toString()) }
      }
    })
  }

  // filter status for each step
  getStepStatus(stepId: statusId): Observable<Step> {
    this.currentStep$.next(stepId)
    this.stepStatus$ = this.stepStatusService.entities$
      .pipe(
        map(stepStates => stepStates.find(state => {
          return state.id === +(this.projectId)
        }))
      )
    if (this.stepStatus$) {
      return this.stepStatus$.pipe(map(data => (
        data?.steps.find(item => item.stepid === stepId)
      )))
    }
  }

  private updateStepStatus(stepstatus: any): void {
    for (const newState of stepstatus.steps) {
      for (const step of this.steps) {
        if (step.stepid === newState.stepid && stepstatus.id === this.projectId) {
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
            this.getProject(this.projectId)
            this.handleNavigate()
            if (this.tempStatus) {
              this.tempStatus.id = newResProject.id
              this.stepStatusService.update(this.tempStatus)
              this.tempStatus = null
            }
          }
        )
    } else {
      // update mode
      const updateProject = {
        id: this.projectId,
        ...projectData
      }
      this.projectsService.update(updateProject)
    }
  }

  handleStepSubmit(data, isDone = false): void {
    this.handleSubmit(data.data)
    this.submitStepStatus(data.stepStatus)
    this.isStepDone = isDone
    this.handleNavigate()
  }

  private submitStepStatus(data: any): void {
    if (this.projectId) {
      const dataWithId: StepState = {
        ...data,
        id: this.projectId
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
      if (this.projectId && this.currentSectionId !== this.nextSectionId) {
        setTimeout(() => {
          this.router.navigate([`editor/project/${this.projectId}/${this.nextSectionId}`])
        }, 1000)
      }
    }
  }

  // Finds the next step sectionId
  private getNextSectionId(): void {
    for (const [index, step] of this.steps.entries()) {
      if (step.stepid === this.currentSectionId) {
        if (step.stepid < 10) {
          this.nextSectionId = this.steps[index + 1].stepid
        } else {
          this.nextSectionId = step.stepid
        }
      }
    }
  }

  clearData(): void {
    if (this.projectSubscription) { this.projectSubscription.unsubscribe() }
    if (this.statusSubscription) { this.statusSubscription.unsubscribe() }
    this.project$ = null
    this.stepStatus$ = null
    this.titleData = null
    this.projectId = null
    this.currentSectionId = null
    this.nextSectionId = null
    this.isStepDone = false
  }

  createSteps(): Step[] {
    this.steps = [
      { stepid: 1, state: 'PENDING', name: '' },
      { stepid: 2, state: 'PENDING', name: '' },
      { stepid: 3, state: 'PENDING', name: '' },
      { stepid: 4, state: 'PENDING', name: '' },
      { stepid: 5, state: 'PENDING', name: '' },
      { stepid: 6, state: 'PENDING', name: '' },
      { stepid: 7, state: 'PENDING', name: '' },
      { stepid: 8, state: 'PENDING', name: '' },
      { stepid: 9, state: 'PENDING', name: '' },
      { stepid: 10, state: 'PENDING', name: '' }
    ]
    this.translate.stream(
      [
        'STEPS_MENU.project_structure_stepsmenu_startingpoint',
        'STEPS_MENU.project_structure_stepsmenu_topic',
        'STEPS_MENU.project_structure_stepsmenu_objectives',
        'STEPS_MENU.project_structure_stepsmenu_creativetitle',
        'STEPS_MENU.project_stepsmenu_drivingquestion',
        'STEPS_MENU.project_structure_stepsmenu_finalproduct',
        'STEPS_MENU.project_structure_stepsmenu_sinopsis',
      ])
      .subscribe(translations => {
        this.steps[0].name = translations['STEPS_MENU.project_structure_stepsmenu_startingpoint']
        this.steps[1].name = translations['STEPS_MENU.project_structure_stepsmenu_topic']
        this.steps[2].name = translations['STEPS_MENU.project_structure_stepsmenu_objectives']
        this.steps[3].name = 'Contenidos' // WIP localization
        this.steps[4].name = 'Estándares' // WIP localization
        this.steps[5].name = translations['STEPS_MENU.project_structure_stepsmenu_creativetitle']
        this.steps[6].name = translations['STEPS_MENU.project_stepsmenu_drivingquestion']
        this.steps[7].name = translations['STEPS_MENU.project_structure_stepsmenu_finalproduct']
        this.steps[8].name = translations['STEPS_MENU.project_structure_stepsmenu_sinopsis']
        this.steps[9].name = 'Interacción'  // WIP localization
      }
      )
    return this.steps
  }
}
