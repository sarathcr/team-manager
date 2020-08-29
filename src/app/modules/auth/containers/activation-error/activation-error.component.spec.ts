import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ActivationErrorComponent } from './activation-error.component'

describe('ActivationErrorComponent', () => {
  let component: ActivationErrorComponent
  let fixture: ComponentFixture<ActivationErrorComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivationErrorComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationErrorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
