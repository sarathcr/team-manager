
import { Injectable } from '@angular/core'
import { Actions } from '@ngrx/effects'

import { Subject } from 'rxjs'

@Injectable({ providedIn: 'root' })

export class ProjectEditorToastService {

  error$ = new Subject<object>()

  constructor(actions$: Actions) {
    actions$.subscribe((data: any) => {
      if (data?.error) {
        this.error$.next(data.error)
      }
    })
  }
}
