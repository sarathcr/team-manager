import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { ActionData } from '../../constants/model/invitation.model'

@Injectable({
  providedIn: 'root',
})
export class InvitationService {
  constructor(private http: HttpClient) {}

  // function to accept or reject invitation by passing tue or false
  invitationAction(actionData: ActionData): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl.projectService}/projects/${actionData.projectId}/Collaborator/acceptOrDenyInvitation`,
      {
        accepted: actionData.accepted,
        email: actionData.email,
      }
    )
  }
}
