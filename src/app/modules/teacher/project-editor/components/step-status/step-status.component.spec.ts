import { ComponentFixture, TestBed } from '@angular/core/testing'

import { StepStatusComponent } from './step-status.component'

describe('StatusComponent', () => {
  let component: StepStatusComponent
  let fixture: ComponentFixture<StepStatusComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StepStatusComponent],
    })

    fixture = TestBed.createComponent(StepStatusComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
