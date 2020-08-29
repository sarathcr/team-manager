import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { RouterOutlet } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'

import { TranslateModule } from '@ngx-translate/core'
import { AppComponent } from './app.component'

describe('AppComponent', (): void => {
  let app: AppComponent
  let fixture: ComponentFixture<AppComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, TranslateModule.forRoot()],
      declarations: [AppComponent],
    })

    fixture = TestBed.createComponent(AppComponent)
    app = fixture.componentInstance
  })

  it('should create the app', (): void => {
    expect(app).toBeTruthy()
  })

  it('should have a router outlet', (): void => {
    const debugElement: DebugElement = fixture.debugElement.query(
      By.directive(RouterOutlet)
    )

    expect(debugElement).toBeTruthy()
  })
})
