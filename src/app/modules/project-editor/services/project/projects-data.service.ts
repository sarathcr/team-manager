import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Project } from 'src/app/shared/constants/project.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProjectsDataService extends DefaultDataService<Project> {

    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super('Project', http, httpUrlGenerator);

    }

    getAll(): Observable<Project[]> {
        return this.http.get<Project[]>(`${environment.apiUrl.projectService}/projects`)
            .pipe(
                map(res => res)
            );
    }

    getById(id: any): Observable<Project> {
        return this.http.get<Project>(`${environment.apiUrl.projectService}/projects/${id}`)
            .pipe(
                map(res => res)
            );
    }

    add(project: object): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl.projectService}/projects`, project)
            .pipe(
                map(res => res)
            );
    }

    update(data: any): Observable<any> {
        let dataChanges = this.nullValidator(data.changes)
        return this.http.put<any>(`${environment.apiUrl.projectService}/projects`, dataChanges)
            .pipe(
                map(res => res)
            );
    }

    // Replaces the null value with {id:-1} 
    private nullValidator(data: any) {
        let dataChanges = { ...data }
        let validator = ['country', 'region', 'academicYear']
        for (let item of validator) {
            if (dataChanges[item] === null)
                dataChanges[item] = { id: -1 } //passing {id:-1} to remove the data from backend 
        }
        return dataChanges 
    }

}