import { Injectable } from '@angular/core'
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { ProjectList } from '../../../constants/model/project.model'

@Injectable()
export class ProjectListDataService extends DefaultDataService<ProjectList> {

    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super('ProjectList', http, httpUrlGenerator)

    }

    getById(pageNumber: number): Observable<ProjectList> {
        const pageSize = 10
        return this.http.get<ProjectList>(`${environment.apiUrl.projectService}/projects/${pageNumber}/${pageSize}`)
            .pipe(
                map(res => {
                    return {...res, pageNumber, pageSize}
                })
            )
    }
}
