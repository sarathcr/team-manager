import {Injectable} from "@angular/core";
import {HttpClient, HttpParams, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import { Project } from 'src/app/shared/models/project.model';
import { environment } from 'src/environments/environment';



@Injectable()
export class ProjectsHttpService {

    constructor(private http:HttpClient) {

    }

    findAllProjects(): Observable<Project[]> {
        return this.http.get(`${environment.apiUrl}/projects`, {
            headers: new HttpHeaders({
                'Content-Type':'application/json',
                "Access-Control-Allow-Origin":"*"
            })
        })
            .pipe(
                map(res => res['payload'])
            );
    }

    findProjectByUrl(projectUrl: string): Observable<Project> {
      return this.http.get<Project>(`${environment.apiUrl}/projects/${projectUrl}`);
    }


    saveProject(projectId: string | number, changes: Partial<Project>) {
        return this.http.put(`${environment.apiUrl}/projects/` + projectId, changes);
    }


}