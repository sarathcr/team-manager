import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LoginComponent } from './login.component'

describe('LoginComponent', (): void => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>
  
  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })

    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
