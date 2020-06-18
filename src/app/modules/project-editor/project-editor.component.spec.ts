import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { RouterOutlet } from '@angular/router'
import { DebugElement } from '@angular/core'
import { RouterTestingModule } from '@angular/router/testing'

import { ProjectEditorComponent } from './project-editor.component'

describe('ProjectEditorComponent', (): void => {
  let component: ProjectEditorComponent
  let fixture: ComponentFixture<ProjectEditorComponent>
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectEditorComponent ],
      imports: [ RouterTestingModule ]
    })

    fixture = TestBed.createComponent(ProjectEditorComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy();
  })

  it('should contain router outlet', (): void => {
    const debugElement: DebugElement = fixture.debugElement.query(By.directive(RouterOutlet))

    expect(debugElement).toBeTruthy()
  })
})
