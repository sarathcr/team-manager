import { Injectable } from '@angular/core'
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { Region } from 'src/app/modules/project-editor/constants/model/project.model'
import { Store } from '@ngrx/store'

@Injectable()
export class RegionDataService extends DefaultDataService<Region> {
    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, private store: Store) {
        super('Region', http, httpUrlGenerator)
    }

    getWithQuery(parm: any): Observable<Region[]> {
        return this.http.get<Region[] | any>(`${environment.apiUrl.curriculumService}/countries/${parm}/regions`)
            .pipe(
                map(res => res),
                catchError(err => of(this.store.dispatch({
                    type: '[Region] @ngrx/data/query-many/failure',
                    payload: err.message,
                    error: { status: err.error.status, error: err.error.error }
                })))
            )
    }
}
