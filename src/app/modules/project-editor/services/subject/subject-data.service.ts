import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Subject } from 'src/app/shared/models/subject.model';
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
    setParam(rId, yId){
      this.regionId = rId;
      this.academicyearId = yId;
    }
    getAll(): Observable<Subject[]> {
      return this.http.get<Subject[]>(`${environment.apiUrl}/regions/${this.regionId}/academicyears/${this.academicyearId}/subjects`)
          .pipe(
              map(res => res)
          );
    }
}
