import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ZipcodeService {

  constructor(
    private http: HttpClient,
  ) {}

  checkZipCode(code: string): Observable<any>{
    return this.http
      .get<any>(`${environment.apiUrl.curriculumService}/zipcode/${code}?code=${code}`)
      .pipe(
        map(value => value),
        catchError(() => {
          return of(false)
        })
      )
  }
}
