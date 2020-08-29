import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { Observable } from 'rxjs'
import { environment } from './../../../../../environments/environment'
import {
  Project,
  StepState,
} from './../../../project-editor/constants/model/project.model'

@Injectable({
  providedIn: 'root',
})
export class ProjectOutputService {
  constructor(private http: HttpClient) {}

  getProjectData(id: string): Observable<Project | any> {
    return this.http.get<Project>(
      `${environment.apiUrl.projectService}/projects/${id}`
    )
  }

  getStepStatus(id: string): Observable<Project | any> {
    return this.http.get<StepState>(
      `${environment.apiUrl.projectService}/projects/${id}/steps`
    )
  }
}
