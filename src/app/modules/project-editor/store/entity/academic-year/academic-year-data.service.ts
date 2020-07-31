import { Injectable } from '@angular/core'
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { AcademicYear } from 'src/app/modules/project-editor/constants/model/project.model'
import { Store } from '@ngrx/store'

@Injectable()
export class AcademicYearDataService extends DefaultDataService<AcademicYear> {

    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, private store: Store) {
        super('AcademicYear', http, httpUrlGenerator)

    }
    getAll(): Observable<AcademicYear[] | any> {
        return this.http.get<AcademicYear[]>(`${environment.apiUrl.curriculumService}/academicyears`)
            .pipe(
                map(res => res),
                catchError(err => of(this.store.dispatch({
                    type: '[AcademicYear] @ngrx/data/query-all/failure',
                    payload: err.message,
                    error: { status: err.error.status, error: err.error.error }
                })))
            )
    }
}
