import { Injectable } from '@angular/core'
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { Region } from 'src/app/modules/project-editor/constants/model/project.model'

@Injectable()
export class RegionDataService extends DefaultDataService<Region> {
    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super('Region', http, httpUrlGenerator)
    }

    getWithQuery(parm: any): Observable<Region[]> {
        return this.http.get<Region[]>(`${environment.apiUrl.curriculumService}/countries/${parm}/regions`)
            .pipe(
                map(res => res)
            )
      }
}
