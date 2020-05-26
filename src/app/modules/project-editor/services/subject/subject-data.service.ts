import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Subject } from 'src/app/shared/constants/subject.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class SubjectDataService extends DefaultDataService<Subject> {
    regionId: number;
    academicyearId: number;
    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super('Subject', http, httpUrlGenerator);
    }
    getWithQuery(query: any): Observable<Subject[]> {
      return this.http.get<Subject[]>(`${environment.apiUrl + query}`)
          .pipe(
              map(res => res)
          );
    }
}
