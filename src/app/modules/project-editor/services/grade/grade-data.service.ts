import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Grade } from 'src/app/shared/constants/grade.model';

@Injectable()
export class GradeDataService extends DefaultDataService<Grade> {
    regionId: number;
    academicyearId: number;
    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super('Country', http, httpUrlGenerator);

    }
    setParam(rId, yId){
      this.regionId = rId;
      this.academicyearId = yId;
    }
    getAll(): Observable<Grade[]> {
      return this.http.get<Grade[]>(`${environment.apiUrl}/regions/${this.regionId}/academicyears/${this.academicyearId}/grades`)
          .pipe(
              map(res => res)
          );
    }
}
