import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FormInputComponent } from './form-input.component'

describe('FormInputComponent', () => {
  let component: FormInputComponent
  let fixture: ComponentFixture<FormInputComponent>
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ FormInputComponent ]
    })

    fixture = TestBed.createComponent(FormInputComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
