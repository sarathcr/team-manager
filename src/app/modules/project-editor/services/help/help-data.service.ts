import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { ContextualHelp, Help } from 'src/app/shared/constants/contextual-help.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class HelpDataService extends DefaultDataService<ContextualHelp> {

    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super('ContextualHelp', http, httpUrlGenerator);

    }

    getAll(): Observable<ContextualHelp[]> {
        return this.http.get<ContextualHelp[]>(`${environment.apiUrl}/steps`)
            .pipe(
                map(res => res)
            );
    }
    getById(id: any): Observable<ContextualHelp> {
      return this.http.get<ContextualHelp>(`${environment.apiUrl}/steps/${id}/helps`)
          .pipe(
              map( res => res )
          );
    }
}
