import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Project } from 'src/app/shared/models/project.model';

@Injectable()
export class NewProjectResService {

    constructor() { }
    private response$ = new Subject<Project>();

    sendResponse(Project) {
        this.response$.next(Project);
    }

    clearResponse() {
        this.response$.next();
    }

    getResponse(): Observable<any> {
        return this.response$.asObservable();
    }
}
