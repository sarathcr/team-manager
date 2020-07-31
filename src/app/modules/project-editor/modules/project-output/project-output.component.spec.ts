import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { RouterOutlet } from '@angular/router'
import { DebugElement } from '@angular/core'
import { RouterTestingModule } from '@angular/router/testing'

import { ProjectOutputComponent } from './project-output.component'

describe('ProjectOutputComponent', (): void => {
  let component: ProjectOutputComponent
  let fixture: ComponentFixture<ProjectOutputComponent>
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectOutputComponent ],
      imports: [ RouterTestingModule ]
    })
    fixture = TestBed.createComponent(ProjectOutputComponent)
    component = fixture.componentInstance
  })
  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
  it('should contain router outlet', (): void => {
    const debugElement: DebugElement = fixture.debugElement.query(By.directive(RouterOutlet))
    expect(debugElement).toBeTruthy()
  })
})
