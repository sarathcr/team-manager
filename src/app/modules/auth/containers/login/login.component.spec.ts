import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { TranslateModule } from '@ngx-translate/core'

import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { CheckboxComponent } from 'src/app/shared/components/checkbox/checkbox.component'
import { InputComponent } from 'src/app/shared/components/input/input.component'
import { LoginComponent } from './login.component'

describe('LoginComponent', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>
  const email = 'email@email.com'
  const password = 'password@123'

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        InputComponent,
        CheckboxComponent,
        ButtonComponent,
      ],
      imports: [TranslateModule.forRoot()],
    })
    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  // xit('should not change loginDisabled if only email is updated', () => {
  //   component.validateLogin(email, 'email')

  //   expect(component.email).toBe(email)
  //   expect(component.loginDisabled).toBeTruthy()
  // })

  // xit('should not change loginDisabled if only password is updated', () => {
  //   component.validateLogin(password, 'password')

  //   expect(component.password).toBe(password)
  //   expect(component.loginDisabled).toBeTruthy()
  // })

  // xit(`should change loginDisabled to false if email and password is updated through
  //   validateLogin method`, () => {
  //   component.validateLogin(email, 'email')
  //   component.validateLogin(password, 'password')

  //   expect(component.email).toBe(email)
  //   expect(component.password).toBe(password)
  //   expect(component.loginDisabled).toBeFalsy()
  // })

  it('should contain login title', () => {
    const loginTitleComponent = fixture.debugElement.query(
      By.css('.login__title')
    ).nativeElement

    expect(loginTitleComponent).toBeTruthy()
    expect(loginTitleComponent.textContent).toBe('LOGIN.login_title_title')
  })

  it('should contain two input components for email and password', () => {
    const inputComponents: DebugElement[] = fixture.debugElement.queryAll(
      By.directive(InputComponent)
    )

    expect(inputComponents.length).toBe(2)
  })

  it('should contain two button components for login using credentials and google', () => {
    const buttonComponents: DebugElement[] = fixture.debugElement.queryAll(
      By.directive(ButtonComponent)
    )

    expect(buttonComponents.length).toBe(2)
  })

  it('should contain checkbox component for remember password', () => {
    const checkboxComponent: DebugElement = fixture.debugElement.query(
      By.directive(CheckboxComponent)
    )

    expect(checkboxComponent).toBeTruthy()
  })
})
