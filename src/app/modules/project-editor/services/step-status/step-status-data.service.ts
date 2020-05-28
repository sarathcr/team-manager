
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StepStatus } from '../../constants/step-status.model';

@Injectable()
export class StepStatusDataService extends DefaultDataService<StepStatus> {
    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super('StepStatus', http, httpUrlGenerator);
    }

    add(data: StepStatus): Observable<any> {
        const { stepid, state } = data
        return this.http.post<any>(`${environment.apiUrl}/projects/${data.id}/assignStepState`, { stepid, state })
            .pipe(
                map(res => res)
            );
    }

    getWithQuery(param: string): Observable<StepStatus[]> {
        return this.http.get<StepStatus[]>(`${environment.apiUrl}/projects/${param}/getAllStepState`)
            .pipe(
                map(res => res)
            );
    }
}