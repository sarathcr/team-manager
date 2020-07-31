import { Injectable } from '@angular/core'
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { Grade } from 'src/app/modules/project-editor/constants/model/project.model'
import { Store } from '@ngrx/store'

@Injectable()
export class GradeDataService extends DefaultDataService<Grade> {
    regionId: number
    academicyearId: number
    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, private store: Store) {
        super('Grade', http, httpUrlGenerator)

    }
    getWithQuery(parm: any): Observable<Grade[] | any> {
        return this.http.get<Grade[]>(`${environment.apiUrl.curriculumService}/regions/${parm.regionId}/academicyears/${parm.academicyearId}/grades`)
            .pipe(
                map(res => res),
                catchError(err => of(this.store.dispatch({
                    type: '[Grade] @ngrx/data/query-many/failure',
                    payload: err.message,
                    error: { status: err.error.status, error: err.error.error }
                })))
            )
    }
}
