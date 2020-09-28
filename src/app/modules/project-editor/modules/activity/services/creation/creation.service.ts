import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { LinkContent } from 'src/app/modules/project-editor/constants/model/activity.model'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class CreationService {
  constructor(private http: HttpClient) {}

  getLinkDetails(link: string): Observable<LinkContent | any> {
    return this.http
      .post(
        `${environment.apiUrl.projectService}/projects/referenceMaterials/linkData`,
        { link }
      )
      .pipe(
        map((data: LinkContent) => {
          if (data?.title) {
            return data
          } else {
            throw Error()
          }
        }),
        catchError(() => {
          return this.resetLinkDetails()
        })
      )
  }

  resetLinkDetails(): Observable<LinkContent | any> {
    return of({
      imageUrl: '',
      title: '',
      url: '',
    })
  }
}
