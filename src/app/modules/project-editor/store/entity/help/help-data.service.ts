import { Injectable } from '@angular/core'
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { ContextualHelp } from '../../../constants/model/project.model'
import { Store } from '@ngrx/store'

@Injectable()
export class HelpDataService extends DefaultDataService<ContextualHelp> {

    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, private store: Store) {
        super('ContextualHelp', http, httpUrlGenerator)

    }

    getAll(): Observable<ContextualHelp[] | any> {
        return this.http.get<ContextualHelp[]>(`${environment.apiUrl.projectService}/steps`)
            .pipe(
                map(res => res),
                catchError(err => of(this.store.dispatch({
                    type: '[ContextualHelp] @ngrx/data/query-many/failure',
                    payload: err.message
                })))
            )
    }
    getById(id: any): Observable<ContextualHelp | any> {
        return this.http.get<ContextualHelp>(`${environment.apiUrl.projectService}/steps/${id}/helps`)
            .pipe(
                map(res => res),
                catchError(err => of(this.store.dispatch({
                    type: '[ContextualHelp] @ngrx/data/query-by-key/failure',
                    payload: err.message,
                    error: { status: err.error.status, error: err.error.error }
                })))
            )
    }
}
