import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class GoogleFileService {
  constructor(private http: HttpClient) {}

  cloneFile(parms: any, googleToken: any): Observable<any> {
    const header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${googleToken}`),
    }
    return this.http
      .post<any>(
        `https://www.googleapis.com/drive/v2/files/${parms.id}/copy`,
        { title: parms.title },
        header
      )
      .pipe(
        map((response) => response),
        catchError((error) => {
          return throwError(error)
        })
      )
  }

  createFile(payload: any, googleToken: any): Observable<any> {
    const header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${googleToken}`),
    }
    return this.http
      .post<any>(
        `https://content.googleapis.com/drive/v2/files`,
        payload,
        header
      )
      .pipe(
        map((response) => response),
        catchError((error) => {
          return throwError(error)
        })
      )
  }
}
