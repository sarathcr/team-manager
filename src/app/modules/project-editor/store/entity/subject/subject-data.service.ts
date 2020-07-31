import { Injectable } from '@angular/core'
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Subject } from 'src/app/modules/project-editor/constants/model/project.model'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { Store } from '@ngrx/store'

@Injectable()
export class SubjectDataService extends DefaultDataService<Subject> {
    regionId: number
    academicyearId: number
    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, private store: Store) {
        super('Subject', http, httpUrlGenerator)
    }
    getWithQuery(parm: any): Observable<Subject[] | any> {
        return this.http.get<Subject[]>(`${environment.apiUrl.curriculumService}/grades/subjects/${parm}`)
            .pipe(
                map(res => res),
                catchError(err => of(this.store.dispatch({
                    type: '[Subject] @ngrx/data/query-many/failure',
                    payload: err.message,
                    error: { status: err.error.status, error: err.error.error }
                })))
            )
    }
}
