import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ExerciseSidebarComponent } from './exercise-sidebar.component'

describe('ExerciseSidebarComponent', () => {
  let component: ExerciseSidebarComponent
  let fixture: ComponentFixture<ExerciseSidebarComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseSidebarComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseSidebarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
