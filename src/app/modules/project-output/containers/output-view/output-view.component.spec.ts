import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { RouterTestingModule } from '@angular/router/testing'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, Observable } from 'rxjs'

import { ProjectOutputService } from './../../services/output/project-output.service'

import { OutputViewComponent } from './output-view.component'

class ProjectOutputServiceStub {}

describe('OutputViewComponent', () => {
  let component: OutputViewComponent
  let fixture: ComponentFixture<OutputViewComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutputViewComponent],
      providers: [
        { provide: ProjectOutputService, useClass: ProjectOutputServiceStub },
      ],
      imports: [RouterTestingModule, TranslateModule.forRoot()],
    })
    fixture = TestBed.createComponent(OutputViewComponent)
    component = fixture.componentInstance
    // fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  // it('should create header component', () => {
  //   const headerDebugElement = fixture.debugElement.query(By.css('.header'))
  //   expect(headerDebugElement).toBeTruthy()
  // })

  // it('should create sidebar component', () => {
  //   const sidebarmDebugElement = fixture.debugElement.query(By.css('.sidebar'))
  //   expect(sidebarmDebugElement).toBeTruthy()
  // })
})
