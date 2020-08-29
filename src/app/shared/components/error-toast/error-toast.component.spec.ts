import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { BehaviorSubject } from 'rxjs'

import { ProjectEditorToastService } from 'src/app/modules/project-editor/services/project-editor-toast/project-editor-toast.service'
import { ErrorToastComponent } from './error-toast.component'

class ProjectEditorToastServiceStub {
  error$ = new BehaviorSubject({})
}
describe('ErrorToastComponent', () => {
  let component: ErrorToastComponent
  let fixture: ComponentFixture<ErrorToastComponent>
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorToastComponent],
      providers: [
        {
          provide: ProjectEditorToastService,
          useClass: ProjectEditorToastServiceStub,
        },
      ],
    })
    fixture = TestBed.createComponent(ErrorToastComponent)
    component = fixture.componentInstance
  })
  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('should verify the default values', () => {
    fixture.detectChanges()
    expect(component.dissmissble).toBeFalsy()
    expect(component.maxLimit).toBe(3)
  })
  it('should contain error message and status', () => {
    const status = 500
    const error = 'Internal Server Error'
    component.errors = [{ status, error }]
    fixture.detectChanges()
    const errorElement = fixture.debugElement.query(By.css('.error-toast'))
      .nativeElement
    expect(errorElement.textContent).toContain(error)
    expect(errorElement.textContent).toContain(String(status))
  })
})
