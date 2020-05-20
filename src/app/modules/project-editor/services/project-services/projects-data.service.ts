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

    add(project): Observable<Project> {
        return this.http.post<any>(`${environment.apiUrl}/projects`, project)
            .pipe(
                map(res => res)
            );
    }

    update(data): Observable<any> {
        return this.http.put<any>(`${environment.apiUrl}/projects`, data.changes)
            .pipe(
                map(res => res)
            );
    }

}