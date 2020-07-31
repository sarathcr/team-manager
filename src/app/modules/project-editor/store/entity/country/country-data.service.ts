import { Injectable } from '@angular/core'
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Country } from 'src/app/modules/project-editor/constants/model/project.model'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { Store } from '@ngrx/store'

@Injectable()
export class CountryDataService extends DefaultDataService<Country> {

    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, private store: Store) {
        super('Country', http, httpUrlGenerator)
    }

    getAll(): Observable<Country[] | any> {
        return this.http.get<Country[]>(`${environment.apiUrl.curriculumService}/countries`)
            .pipe(
                map(res => res),
                catchError(err => of(this.store.dispatch({
                    type: '[Country] @ngrx/data/query-all/failure',
                    payload: err.message,
                    error: { status: err.error.status, error: err.error.error }
                })))
            )
    }
}
