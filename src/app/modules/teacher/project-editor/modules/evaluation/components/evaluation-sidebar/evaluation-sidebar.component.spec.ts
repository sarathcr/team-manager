import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { EvaluationSidebarComponent } from './evaluation-sidebar.component'

describe('AddExerciseComponent', () => {
  let component: EvaluationSidebarComponent
  let fixture: ComponentFixture<EvaluationSidebarComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluationSidebarComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationSidebarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
