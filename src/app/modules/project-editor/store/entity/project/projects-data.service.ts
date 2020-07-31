import { Injectable } from '@angular/core'
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Project } from 'src/app/modules/project-editor/constants/model/project.model'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
@Injectable()
export class ProjectsDataService extends DefaultDataService<Project> {

    constructor(
        http: HttpClient,
        httpUrlGenerator: HttpUrlGenerator,
        private router: Router,
        private store: Store) {
        super('Project', http, httpUrlGenerator)

    }

    getAll(): Observable<Project[]> {
        return this.http.get<Project[] | any>(`${environment.apiUrl.projectService}/projects`)
            .pipe(
                map(res => res),
                catchError(err => of(this.store.dispatch({
                    type: '[Project] @ngrx/data/query-many/failure',
                    payload: err.message,
                    error: { status: err.error.status, error: err.error.error }
                })))
            )
    }

    getById(id: any): Observable<Project | any> {
        return this.http.get<Project>(`${environment.apiUrl.projectService}/projects/${id}`)
            .pipe(
                map(res => res),
                catchError((err) => {
                    this.errorHandler(err)
                    return of(this.store.dispatch({
                        type: '[Project] @ngrx/data/query-by-key/failure',
                        payload: err.message,
                        error: { status: err.error.status, error: err.error.error }
                    }))
                })
            )
    }

    add(project: object): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl.projectService}/projects`, project)
            .pipe(
                map(res => res),
                catchError(err => of(this.store.dispatch({
                    type: '[Project] @ngrx/data/query-many/failure',
                    payload: err.message,
                    error: { status: err.error.status, error: err.error.error }
                })))
            )
    }

    update(data: any): Observable<any> {
        if (!data.changes?.updateType) {
            const dataChanges = this.nullValidator(data.changes)
            return this.http.put<any>(`${environment.apiUrl.projectService}/projects`, dataChanges)
                .pipe(
                    map(res => res),
                    catchError(err => of(this.store.dispatch({
                        type: '[Project] @ngrx/data/save/update-one/failure',
                        payload: err.message,
                        error: { status: err.error.status, error: err.error.error }
                    })))
                )
        }
        if (data.changes?.updateType === 'removeCriteria') {
            const { subjectId, criteriaId, id } = data.changes
            return this.http.delete<any>(`${environment.apiUrl.projectService}/projects/${id}/subjects/${subjectId}/evaluationcriteria/${criteriaId}`)
                .pipe(
                    map(() => data.changes),
                    catchError(err => of(this.store.dispatch({
                        type: '[Project] @ngrx/data/save/update-one/failure',
                        payload: err.message,
                        error: { status: err.error.status, error: err.error.error }
                    })))
                )
        }
        if (data.changes?.updateType === 'removeContent') {
            const { subjectId, contentId, id } = data.changes
            return this.http.delete<any>(`${environment.apiUrl.projectService}/projects/${id}/subjects/${subjectId}/contents/${contentId}`)
                .pipe(
                    map(() => data.changes),
                    catchError(err => of(this.store.dispatch({
                        type: '[Project] @ngrx/data/save/update-one/failure',
                        payload: err.message,
                        error: { status: err.error.status, error: err.error.error }
                    })))
                )
        }
        if (data.changes?.updateType === 'removeStandard') {
            const { competencyObjectiveId, standardId, id } = data.changes
            return this.http.delete<any>(`${environment.apiUrl.projectService}/project/${id}/competencyObjectives/${competencyObjectiveId}/standards/${standardId}`)
                .pipe(
                    map(() => data.changes),
                    catchError(err => of(this.store.dispatch({
                        type: '[Project] @ngrx/data/save/update-one/failure',
                        payload: err.message,
                        error: { status: err.error.status, error: err.error.error }
                    })))
                )
        }
    }


    // Replaces the null value with {id:-1}
    private nullValidator(data: any): object {
        const dataChanges = { ...data }
        const validator = ['country', 'region', 'academicYear']
        for (const item of validator) {
            if (dataChanges[item] === null) {
                dataChanges[item] = { id: -1 }
            } // passing {id:-1} to remove the data from backend
        }
        return dataChanges
    }

    errorHandler(error: HttpErrorResponse): any {
        if (error.status === 404) {
            this.router.navigate(['not-found'])
        }
    }
}
