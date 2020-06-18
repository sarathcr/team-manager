import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AcademicYear } from 'src/app/shared/constants/academic-year.model';

@Injectable()
export class AcademicYearDataService extends DefaultDataService<AcademicYear> {

    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super('AcademicYear', http, httpUrlGenerator);

    }
    getAll(): Observable<AcademicYear[]> {
      return this.http.get<AcademicYear[]>(`${environment.apiUrl.curriculumService}/academicyears`)
          .pipe(
              map(res => res)
          );
    }
}
