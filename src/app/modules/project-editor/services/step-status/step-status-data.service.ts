
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Step } from '../../constants/step.model';

@Injectable()
export class StepStatusDataService extends DefaultDataService<Step> {
    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super('StepStatus', http, httpUrlGenerator);
    }

    add(data: Step): Observable<any> {
        const { stepid, status } = data
        return this.http.post<any>(`${environment.apiUrl}/projects/${data.id}/assignStepState`, { stepid, status })
            .pipe(
                map(res => res)
            );
    }

    getWithQuery(param: string): Observable<Step[]> {
        return this.http.get<Step[]>(`${environment.apiUrl}/projects/${param}/getAllStepState`)
            .pipe(
                map(res => res)
            );
    }
}