import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ButtonComponent } from './button.component'

describe('ButtonComponent', (): void => {
  let component: ButtonComponent
  let fixture: ComponentFixture<ButtonComponent>

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [ButtonComponent]
    })

    fixture = TestBed.createComponent(ButtonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
