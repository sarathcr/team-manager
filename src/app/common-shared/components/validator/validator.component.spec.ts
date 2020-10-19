import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { TranslateModule } from '@ngx-translate/core'

import { ValidatorComponent } from './validator.component'

describe('ValidatorComponent', () => {
  let component: ValidatorComponent
  let fixture: ComponentFixture<ValidatorComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidatorComponent],
      imports: [TranslateModule.forRoot()],
    })
    fixture = TestBed.createComponent(ValidatorComponent)
    component = fixture.componentInstance
    component.value = ''
  })

  afterEach(() => {
    fixture.destroy()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should contain counter and helpertext if there is value and validator enabled', () => {
    component.helperText = 'lorem ipsum'

    fixture.detectChanges()
    const validatorComponent = fixture.debugElement.query(By.css('.counter'))
    const helperText = fixture.debugElement.query(
      By.css('.counter__helper-text')
    )

    expect(validatorComponent).toBeTruthy()
    expect(helperText).toBeTruthy()
  })

  it('should not show error if the never value exceeds the maxlength', () => {
    component.value = 'loremipsu'
    component.errorText = 'Limit exceeded'
    component.maxlength = 10
    component.valueChange('loremipsu', 'keyUp')

    fixture.detectChanges()
    const error = fixture.debugElement.query(By.css('counter__error'))
    const errorText = fixture.debugElement.query(
      By.css('.counter__helper-text')
    )

    expect(error).toBeFalsy()
    expect(errorText).toBeFalsy()
  })

  it('should show error if the  value exceeds the maxlength', () => {
    component.value = 'loremipsum'
    component.errorText = 'Limit exceeded'
    component.maxlength = 10

    fixture.detectChanges()
    component.valueChange('loremipsum', 'keyUp')
    fixture.detectChanges()

    expect(component.limitExceeds).toBe(true)
  })

  it('should show error if the  value exceeds the maxlength on pasting', () => {
    component.value = 'loremipsum'
    component.errorText = 'Limit exceeded'
    component.maxlength = 10

    fixture.detectChanges()
    component.valueChange('loremipsumss', 'paste')
    fixture.detectChanges()

    expect(component.limitExceeds).toBe(true)
  })

  it('should remove the error after 5 seconds', fakeAsync(() => {
    component.value = 'loremipsum'
    component.errorText = 'Limit exceeded'
    component.maxlength = 10

    fixture.detectChanges()
    component.valueChange('loremipsum', 'keyUp')
    fixture.detectChanges()
    tick(5000)
    fixture.detectChanges()

    fixture.whenStable().then(() => {
      expect(component.limitExceeds).toBeFalsy()
    })
  }))
})
