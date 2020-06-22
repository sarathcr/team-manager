import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator} from '@ngrx/data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Grade } from 'src/app/modules/project-editor/constants/project.model';

@Injectable()
export class GradeDataService extends DefaultDataService<Grade> {
    regionId: number;
    academicyearId: number;
    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super('Country', http, httpUrlGenerator);

    }
    getWithQuery(parm: any): Observable<Grade[]> {
        return this.http.get<Grade[]>(`${environment.apiUrl.curriculumService}/regions/${parm.regionId}/academicyears/${parm.academicyearId}/grades`)
            .pipe(
                map(res => res)
            );
    }
}
