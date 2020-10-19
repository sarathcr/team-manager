import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { Observable } from 'rxjs'
import { environment } from './../../../../../environments/environment'

import {
  Project,
  StepState,
} from '../../../teacher/project-editor/constants/model/project.model'

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

  getCodes(id: string): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl.curriculumService}/curriculums/${id}/basicskills/dimensions`
    )
  }

  getCrtieriasDetails(ids: any): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl.curriculumService}/evaluationcriteria/${ids}`
    )
  }

  getSubjectWiseDimension(id: any): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl.curriculumService}/curriculums/${id}/dimensions`
    )
  }

  getCriteriaAndContentGradeWise(
    criteriaId: any,
    contentId: any
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl.curriculumService}/grades/evaluationcriteira/${criteriaId}/contents/${contentId}/`
    )
  }

  getCurriculumRelation(regionId: number, stage: string): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl.curriculumService}/curriculums/regions/${regionId}/stage/${stage}/curriculum`
    )
  }

  getJsonData(url: string): Observable<any> {
    return this.http.get<any>(url)
  }

  getBasicSkillShow(curriculumID: number): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl.curriculumService}/curriculums/${curriculumID}/basicskills`
    )
  }
}
