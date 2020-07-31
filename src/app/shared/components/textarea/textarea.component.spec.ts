import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DebugElement } from '@angular/core'
import { By } from '@angular/platform-browser'

import { of } from 'rxjs'
import { TranslateModule } from '@ngx-translate/core'

import { TextareaComponent } from './textarea.component'

import { ValidatorComponent } from '../validator/validator.component'

describe('TextareaComponent', (): void => {
  let component: TextareaComponent
  let fixture: ComponentFixture<TextareaComponent>

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [TextareaComponent, ValidatorComponent],
      imports: [TranslateModule.forRoot()],
    })

    fixture = TestBed.createComponent(TextareaComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })

  it('should have textarea element', () => {
    fixture.detectChanges()

    const textareaComponent: DebugElement = fixture.debugElement.query(
      By.css('.textarea__description')
    )

    expect(textareaComponent).toBeTruthy()
  })

  it('should show textarea with default values if no input prop is passed', (): void => {
    fixture.detectChanges()

    const textareaComponent: DebugElement = fixture.debugElement.query(
      By.css('.textarea__description')
    )

    expect(textareaComponent.properties.placeholder).toBeDefined()
    expect(textareaComponent.attributes.maxlength).toBeUndefined()
  })

  it('should show input attributes if corresponding input props are passed', (): void => {
    const maxLength = 100
    const placeholder = 'lorem ipsum'
    const value = 'lorem ipsum'
    component.placeholder = placeholder
    component.value = value
    component.maxLength = maxLength

    fixture.detectChanges()

    const textareaComponent: DebugElement = fixture.debugElement.query(
      By.css('.textarea__description')
    )

    expect(textareaComponent.properties.placeholder).toBe(placeholder)
    expect(textareaComponent.properties.value).toBe(value)
    expect(textareaComponent.attributes.maxlength).toBe(String(maxLength))
  })

  it('should show enter icon if the textarea variant equals to listItem', () => {
    component.variant = 'listItem'

    fixture.detectChanges()

    const enterIcon: DebugElement = fixture.debugElement.query(
      By.css('.textarea__enter')
    )

    expect(enterIcon).toBeTruthy()
  })

  it('should display the value', () => {
    component.value$ = of('lorem ipsum')
    fixture.detectChanges()

    const textareaComponent = fixture.debugElement.query(
      By.css('.textarea__description')
    )

    expect(textareaComponent.properties.value.includes('lorem ipsum')).toEqual(
      true
    )
    expect(component.value).toEqual('lorem ipsum')
  })

  it('should emit the value on change of the text in default variant ', () => {
    const value = 'lorem ipsum'
    spyOn(component.inputChange, 'emit')
    component.onValueChange(value)

    fixture.detectChanges()

    expect(component.inputChange.emit).toHaveBeenCalledWith({
      value: value.trim(),
      updated: true,
      status: 'INPROCESS',
    })
  })

  it('should emit the value only on the click of enter icon in listItem variant', () => {
    const value = 'lorem ipsum'
    component.variant = 'listItem'
    component.value = value
    component.focus = true
    spyOn(component.inputChange, 'emit')

    fixture.detectChanges()
    const enterIcon = fixture.debugElement.query(By.css('.textarea__enter'))
    enterIcon.triggerEventHandler('click', null)
    fixture.detectChanges()

    expect(component.inputChange.emit).toHaveBeenCalledWith({ name: value })
  })

  it('should show the counter and helper text if the validation is enabled', () => {
    const helperText = 'Helper Text'
    component.variant = 'listItem'
    component.enableValidator = true
    component.helperText = helperText
    component.maxLength = 20

    fixture.detectChanges()
    const counterElement = fixture.debugElement.query(
      By.directive(ValidatorComponent)
    )

    expect(counterElement).toBeTruthy()
  })

  it('should have counter component', () => {
    fixture.detectChanges()
    const counterComponent: DebugElement = fixture.debugElement.query(
      By.css('.textarea-wrapper__counter-wrapper')
    )

    expect(counterComponent).toBeTruthy()
  })

  it('should unsubscribe the subscriptions on destroy', (): void => {
    const unsubscription = spyOn(component.subscriptions, 'unsubscribe')

    fixture.destroy()

    expect(unsubscription).toHaveBeenCalled()
  })
})
