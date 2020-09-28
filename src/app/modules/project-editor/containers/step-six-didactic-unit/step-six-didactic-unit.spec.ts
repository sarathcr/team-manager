import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { StepSixDidacticUnitComponent } from './step-six-didactic-unit.component'

describe('StepSixDidacticUnitComponent', () => {
  let component: StepSixDidacticUnitComponent
  let fixture: ComponentFixture<StepSixDidacticUnitComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepSixDidacticUnitComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(StepSixDidacticUnitComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
