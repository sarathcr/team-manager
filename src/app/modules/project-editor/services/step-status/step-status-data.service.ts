
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StepState } from '../../constants/step.model';

@Injectable()
export class StepStatusDataService extends DefaultDataService<StepState[]> {
    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super('StepStatus', http, httpUrlGenerator);
    }
    update(data: any): Observable<any> {
        const { id: projectId,state: stateData } = data.changes
        const { stepid, state } = stateData[0]
        return this.http.post<any>(`${environment.apiUrl}/projects/${data.id}/assignStepState`, { stepid, state, projectId })
            .pipe(
                map(res => {
                    const stepstate: any = {
                        state: [],
                        id: Number(data.id)
                    }
                    stepstate.state.push({ ...res })
                    return [stepstate]
                })
            );
    }

    getWithQuery(param: string): Observable<any[]> {
        return this.http.get<StepState[]>(`${environment.apiUrl}/projects/${param}/getAllStepState`)
            .pipe(
                map(res => [{ state: [...res], id: Number(param) }])
            );
    }

}
