import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Store } from '@ngrx/store'
import { cloneDeep } from 'lodash'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { unfreeze } from 'src/app/common-shared/utility/object.utility'
import {
  Project,
  ProjectStoreUpdate,
} from 'src/app/modules/teacher/project-editor/constants/model/project.model'
import { environment } from 'src/environments/environment'
import { Activity, Exercise } from '../../../constants/model/activity.model'

@Injectable()
export class ProjectsDataService extends DefaultDataService<Project> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private router: Router,
    private store: Store
  ) {
    super('Project', http, httpUrlGenerator)
  }

  getAll(): Observable<Project[]> {
    return this.http
      .get<Project[] | any>(`${environment.apiUrl.projectService}/projects`)
      .pipe(
        map((res) => res),
        catchError((err) =>
          of(
            this.store.dispatch({
              type: '[Project] @ngrx/data/query-many/failure',
              payload: err.message,
              error: { status: err.error.status, error: err.error.error },
            })
          )
        )
      )
  }

  getById(id: any): Observable<Project | any> {
    return this.http
      .get<Project>(`${environment.apiUrl.projectService}/projects/${id}`)
      .pipe(
        map((res) => res),
        catchError((err) => {
          this.errorHandler(err)
          return of(
            this.store.dispatch({
              type: '[Project] @ngrx/data/query-by-key/failure',
              payload: err.message,
              error: { status: err.error.status, error: err.error.error },
            })
          )
        })
      )
  }

  add(project: Project): Observable<any> {
    if (project.id) {
      return this.clone(project.id, project.jwt, project.userId)
    } else {
      return this.http
        .post<any>(`${environment.apiUrl.projectService}/projects`, project)
        .pipe(
          map((res) => {
            if (res.id) {
              return res
            } else {
              return { error: res, id: 'create' }
            }
          }),
          catchError((err) =>
            of(
              this.store.dispatch({
                type: '[Project] @ngrx/data/query-many/failure',
                payload: err.message,
                error: { status: err.error.status, error: err.error.error },
              })
            )
          )
        )
    }
  }

  clone(projectId: number, jwt: string, userId: number): Observable<any> {
    return this.http
      .post<any>(
        `${environment.apiUrl.projectService}/projects/${projectId}/clone`,
        { jwt, userId }
      )
      .pipe(
        (map((res) => {
          return res
        }),
        catchError((err) => {
          return of(
            this.store.dispatch({
              type: '[Project] @ngrx/data/add-one/failure',
              payload: err.message,
              error: { status: err.error.status, error: err.error.error },
            })
          )
        }))
      )
  }

  update(data: ProjectStoreUpdate | any): Observable<any> {
    if (!data.changes?.updateType) {
      const dataChanges = this.nullValidator(data.changes)
      return this.http
        .put<any>(`${environment.apiUrl.projectService}/projects`, dataChanges)
        .pipe(
          map((res) => res),
          catchError((err) =>
            of(
              this.store.dispatch({
                type: '[Project] @ngrx/data/save/update-one/failure',
                payload: err.message,
                error: { status: err.error.status, error: err.error.error },
              })
            )
          )
        )
    }
    if (data.changes?.updateType === 'removeCriteria') {
      const { subjectId, criteriaId, id } = data.changes
      return this.http
        .delete<any>(
          `${environment.apiUrl.projectService}/projects/${id}/subjects/${subjectId}/evaluationcriteria/${criteriaId}`
        )
        .pipe(
          map((result) => result),
          catchError((err) =>
            of(
              this.store.dispatch({
                type: '[Project] @ngrx/data/save/update-one/failure',
                payload: err.message,
                error: { status: err.error.status, error: err.error.error },
              })
            )
          )
        )
    }
    if (data.changes?.updateType === 'removeContent') {
      const { subjectId, contentId, id } = data.changes
      return this.http
        .delete<any>(
          `${environment.apiUrl.projectService}/projects/${id}/subjects/${subjectId}/contents/${contentId}`
        )
        .pipe(
          map((res) => {
            let updateProject = data.changes

            if (res && res?.type !== 'NONE') {
              // This block is executed when step4 dependency with Activity
              updateProject = {
                ...updateProject,
                error: res,
              }
            } else {
              updateProject = {
                ...updateProject,
                subjects: this.getContentsUpdatedProject(
                  updateProject,
                  subjectId,
                  contentId
                ),
              }
            }
            return updateProject
          }),
          catchError((err) =>
            of(
              this.store.dispatch({
                type: '[Project] @ngrx/data/save/update-one/failure',
                payload: err.message,
                error: { status: err.error.status, error: err.error.error },
              })
            )
          )
        )
    }
    if (data.changes?.updateType === 'removeStandard') {
      const { competencyObjectiveId, standardId, id } = data.changes
      return this.http
        .delete<any>(
          `${environment.apiUrl.projectService}/project/${id}/competencyObjectives/${competencyObjectiveId}/standards/${standardId}`
        )
        .pipe(
          map((res) => {
            let updateProject = data.changes

            if (res && res?.type !== 'NONE') {
              // This block is executed when step4 dependency with Activity
              updateProject = {
                ...updateProject,
                error: res,
              }
            } else {
              updateProject = {
                ...updateProject,
                competencyObjectives: this.getStandardsUpdatedProject(
                  updateProject,
                  competencyObjectiveId,
                  standardId
                ),
              }
            }
            return updateProject
          }),
          catchError((err) =>
            of(
              this.store.dispatch({
                type: '[Project] @ngrx/data/save/update-one/failure',
                payload: err.message,
                error: { status: err.error.status, error: err.error.error },
              })
            )
          )
        )
    }
    if (
      data.changes?.updateType === 'createActivity' ||
      data.changes?.updateType === 'updateActivity'
    ) {
      const { id, activityId } = data.changes
      const avtivity = activityId
        ? data.changes.activities.find((activity) => activity.id === activityId)
        : data.changes.activities.find((activity) => activity && !activity.id)
      return this.http[activityId ? 'put' : 'post']<Activity>(
        `${environment.apiUrl.projectService}/projects/${id}/activities/`,
        avtivity
      ).pipe(
        map((res) => {
          const isError = !!res?.error
          const updateProject = {
            ...data.changes,
            error: res?.error ? res.error : null,
            activities: activityId
              ? data.changes.activities.map((activity) =>
                  activity.id === activityId
                    ? isError
                      ? { ...res, error: null } // remove the error from activity resposne if an upadate
                      : res
                    : activity
                )
              : isError
              ? data.changes.activities.filter((activity) => activity.id)
              : data.changes.activities.map((activity) =>
                  !activity.id ? res : activity
                ),
          }
          if (data.changes?.updateType === 'createActivity') {
            updateProject.activityCreated = res.id
          }
          return updateProject
        }),
        catchError((err) =>
          of(
            this.store.dispatch({
              type: '[Project] @ngrx/data/save/update-one/failure',
              payload: err.message,
              error: { status: err.error.status, error: err.error.error },
            })
          )
        )
      )
    }
    if (data.changes?.updateType === 'deleteActivity') {
      const { id, activityId } = data.changes
      return this.http
        .delete<Activity[]>(
          `${environment.apiUrl.projectService}/projects/${id}/activities/${activityId}`
        )
        .pipe(
          map((res) => res),
          catchError((err) =>
            of(
              this.store.dispatch({
                type: '[Activity] @ngrx/data/delete/failure',
                payload: err.message,
                error: { status: err.error.status, error: err.error.error },
              })
            )
          )
        )
    }
    if (
      data.changes?.updateType === 'createExercise' ||
      data.changes?.updateType === 'updateExercise'
    ) {
      const { id, activityId } = data.changes
      const isUpdate =
        data.changes?.updateType === 'updateExercise' ? true : false
      return this.http[isUpdate ? 'put' : 'post']<Exercise>(
        `${environment.apiUrl.projectService}/projects/${id}/activities/${activityId}/excercise/`,
        data.changes.exercise
      ).pipe(
        map((res) => {
          const isTitleError = !!res?.error
          const dataChanges = { ...data.changes }
          const updateProject = {
            ...dataChanges,
            error: res?.error ? res.error : null,
            activities: this.updateDataObj(
              dataChanges.activities,
              activityId,
              res,
              isTitleError,
              isUpdate
            ),
          }
          return updateProject
        }),
        catchError((err) =>
          of(
            this.store.dispatch({
              type: '[Exercise] @ngrx/data/query-many/failure',
              payload: err.message,
              error: { status: err.error.status, error: err.error.error },
            })
          )
        )
      )
    }
    if (data.changes?.updateType === 'deleteExercise') {
      const { id, activityId, exerciseId } = data.changes
      return this.http
        .delete<Activity[]>(
          `${environment.apiUrl.projectService}/projects/${id}/activities/${activityId}/excercise/${exerciseId}`
        )
        .pipe(
          map((res) => res),
          catchError((err) =>
            of(
              this.store.dispatch({
                type: '[Activity] @ngrx/data/delete/failure',
                payload: err.message,
                error: { status: err.error.status, error: err.error.error },
              })
            )
          )
        )
    }

    if (data.changes?.updateType === 'sortOrderActivity') {
      const { id, sortOrder } = data.changes
      return this.http
        .put(
          `${environment.apiUrl.projectService}/projects/${id}/activity/updatesortorder`,
          sortOrder
        )
        .pipe(
          map((res: any) => {
            if (res) {
              const activities = cloneDeep(data.changes.activities)
              activities.map(
                (activity) =>
                  (activity.sortOrder = res.find(
                    (resp) => resp.modelId === activity.id
                  ).modelOrder)
              )
              const dataChanges = {
                ...data.changes,
                activities,
              }
              return dataChanges
            }
          }),
          catchError((err) =>
            of(
              this.store.dispatch({
                type: '[Activity] @ngrx/data/query-many/failure',
                payload: err.message,
                error: { status: err.error.status, error: err.error.error },
              })
            )
          )
        )
    }
    if (data.changes?.updateType === 'sortOrderExercise') {
      const { id, sortOrder, activityId } = data.changes
      return this.http
        .put(
          `${environment.apiUrl.projectService}/projects/${id}/activity/${activityId}/exercise/updatesortorder`,
          sortOrder
        )
        .pipe(
          map((res: any) => {
            const activities = cloneDeep(data.changes.activities)
            activities
              .filter((activity) => activity.id === activityId)[0]
              .exercises?.map(
                (exercise) =>
                  (exercise.sortOrder = res.find(
                    (resp) => resp.modelId === exercise.id
                  ).modelOrder)
              )
            const dataChanges = {
              ...data.changes,
              activities,
            }
            return dataChanges
          }),
          catchError((err) =>
            of(
              this.store.dispatch({
                type: '[Exercise] @ngrx/data/query-many/failure',
                payload: err.message,
                error: { status: err.error.status, error: err.error.error },
              })
            )
          )
        )
    }
  }

  private getContentsUpdatedProject(
    projectObj: any,
    subjectId: number,
    contentId: number
  ): Project {
    return projectObj?.subjects?.map((sub) => {
      if (sub.id === subjectId) {
        const subClone = unfreeze(sub)
        const contents = subClone.contents.filter(
          (cont) => cont.id !== contentId
        )
        const customContents = subClone.customContents.filter(
          (cont) => cont.id !== contentId
        )
        subClone.contents = contents
        subClone.customContents = customContents
        return subClone
      } else {
        return sub
      }
    })
  }

  private getStandardsUpdatedProject(
    projectObj: any,
    competencyObjectiveId: number,
    standardId: number
  ): Project {
    return projectObj?.competencyObjectives?.map((obj) => {
      if (obj.id === competencyObjectiveId) {
        const subClone = unfreeze(obj)
        const standards = subClone.standards.filter(
          (std) => std.id !== standardId
        )
        const customStandards = subClone.customStandards.filter(
          (std) => std.id !== standardId
        )
        subClone.standards = standards
        subClone.customStandards = customStandards
        return subClone
      } else {
        return obj
      }
    })
  }

  private updateDataObj(
    activityList1: Activity[],
    activityId: number,
    res: Exercise,
    isTitleError: boolean,
    isUpdate: boolean
  ): Activity[] {
    let activityList = JSON.parse(JSON.stringify(activityList1))
    activityList = activityList.map((activity: Activity) => {
      if (activity.id === activityId) {
        const index = activity.exercises.findIndex((exe) => !exe.id)
        if (!isTitleError || isUpdate) {
          activity.exercises[index] = res
        } else {
          activity.exercises.splice(index, 1)
        }
      }
      return activity
    })
    return activityList
  }

  // Replaces the null value with {id:-1} or -1
  private nullValidator(data: any): object {
    const dataChanges = { ...data }
    const validator = ['country', 'region', 'academicYear', 'curriculumId']
    for (const item of validator) {
      if (dataChanges[item] === null) {
        if (item === 'curriculumId') {
          dataChanges[item] = -1 // passing -1 to remove the data from backend
        } else {
          dataChanges[item] = { id: -1 } // passing {id:-1} to remove the data from backend
        }
      }
    }
    return dataChanges
  }

  errorHandler(error: HttpErrorResponse): any {
    if (error.status === 404) {
      this.router.navigate(['not-found'])
    }
  }
}
