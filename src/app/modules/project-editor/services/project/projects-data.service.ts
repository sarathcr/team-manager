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
        return this.http.get<Project[]>(`${environment.apiUrl}/projects`)
            .pipe(
                map(res => res)
            );
    }

    add(project: object): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/projects`, project)
            .pipe(
                map(res => res)
            );
    }

    update(data: any): Observable<any> {
        let dataChanges = { ...data.changes }
        let validator = ['country', 'region', 'academicYear']
        for (let item of validator) {
            if (dataChanges[item] === null)
                dataChanges[item] = { id: -1 }  //replaces null value
        }
        return this.http.put<any>(`${environment.apiUrl}/projects`, dataChanges)
            .pipe(
                map(res => res)
            );
    }

    getWithQuery(query: any): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl + query}`)
            .pipe(
                map(res => res)
            );
    }

}