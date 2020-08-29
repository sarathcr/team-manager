import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { Content } from 'src/app/modules/project-editor/constants/model/activity.model'

@Injectable({
  providedIn: 'root',
})
export class CreationService {

  constructor(private http: HttpClient) {}

  getLinkDetails(link: string): Observable<Content | any> {
    return this.http.get(`https://cors-anywhere.herokuapp.com/${link}`, {responseType: 'text'}).pipe(
      map((data) => {
        const doc = new DOMParser().parseFromString(data, 'text/html')
        const properties = ['og:url', 'og:title', 'og:image', 'og:type']
        const contents: Content = {}
        const metas = doc.getElementsByTagName('meta')
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < metas.length; i++) {
          const property = metas[i].getAttribute('property')
          if (properties.includes(property)) {
            contents[property.split(':')[1]] = metas[i].getAttribute('content')
          }
        }
        if (contents?.title && contents?.image && contents?.type) {
          return contents
        }
        else {
          return false
        }
      }),
      catchError(() => of(false))
    )
  }
}
