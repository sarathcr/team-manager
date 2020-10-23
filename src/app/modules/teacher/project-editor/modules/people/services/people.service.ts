import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { UserService } from 'src/app/modules/auth/services/user/user.service'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  baseURL = `${environment.apiUrl.projectService}/projects`
  constructor(private http: HttpClient, private user: UserService) {}

  addCollaborator(
    emails: string[],
    profileType: string,
    experienceId: number
  ): Observable<any> {
    const userId = this.user.getUserId()
    return this.http
      .post<any>(
        `${this.baseURL}/${experienceId}/invitator/${userId}/addCollaboratorList`,
        {
          emails,
          profileType,
        }
      )
      .pipe(
        map((value) => value),
        catchError(() => {
          return of(false)
        })
      )
  }

  getCollaborators(experienceId: number, query: string): Observable<any> {
    return this.http
      .get<any>(`${this.baseURL}/${experienceId}/getCollaborators${query}`)
      .pipe(
        map((res) => res),
        catchError(() => of(false))
      )
  }

  removeCollaborator(experienceId: number, emails: string[]): Observable<any> {
    return this.http
      .post<any>(`${this.baseURL}/${experienceId}/removeCollaborator`, {
        emails,
      })
      .pipe(
        map((res) => res),
        catchError(() => of(false))
      )
  }
}
