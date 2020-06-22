import { Injectable } from '@angular/core'
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data'
import { Country } from 'src/app/modules/project-editor/constants/project.model'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment'

@Injectable()
export class CountryDataService extends DefaultDataService<Country> {

    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super('Country', http, httpUrlGenerator)

    }

    getAll(): Observable<Country[]> {
      return this.http.get<Country[]>(`${environment.apiUrl.curriculumService}/countries`)
          .pipe(
              map(res => res)
          )
    }
}
