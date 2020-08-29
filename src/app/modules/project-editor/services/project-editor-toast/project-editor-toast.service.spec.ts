import { TestBed } from '@angular/core/testing'

import { Provider } from '@angular/core'
import { Actions, EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { defer, Observable, of } from 'rxjs'
import { reducers } from 'src/app/modules/auth/reducers'
import { ProjectEditorToastService } from './project-editor-toast.service'

function provideMockActions(source: Observable<any>): Provider
function provideMockActions(factory: Observable<any>): Provider
function provideMockActions(
  factoryOrSource: (() => Observable<any>) | Observable<any>
): Provider {
  return {
    provide: Actions,
    useFactory: (): Observable<any> => {
      if (typeof factoryOrSource === 'function') {
        return new Actions(defer(factoryOrSource))
      }

      return new Actions(factoryOrSource)
    },
  }
}
describe('ProjectEditorToastService', () => {
  let service: ProjectEditorToastService
  const actions: Observable<any> = of()

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockActions(actions)],
      imports: [StoreModule.forRoot(reducers, {}), EffectsModule.forRoot([])],
    })
    service = TestBed.inject(ProjectEditorToastService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
