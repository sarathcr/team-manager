import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { ProjectTitleComponent } from './project-title.component'



describe('ProjectTitleComponent', (): void => {
  let component: ProjectTitleComponent
  let fixture: ComponentFixture<ProjectTitleComponent>

  const getDebugElementByCss =
    (css: string, currentFixture: ComponentFixture<ProjectTitleComponent>): DebugElement => {
    return currentFixture.debugElement.query(By.css(css))
  }

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTitleComponent ],
      imports: [ FormsModule ]
    })

    fixture = TestBed.createComponent(ProjectTitleComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })

  it('should show input field with default values if no input prop is passed', (): void => {
    fixture.detectChanges()

    const inputDebugElement: DebugElement = getDebugElementByCss('.project-title__input', fixture)

    expect(inputDebugElement.properties.placeholder).toBeUndefined()
    expect(inputDebugElement.attributes.maxlength).toBeUndefined()
  })

  it('should show input attributes if corresponding input props are passed', (): void => {
    const maxLength = 75
    const placeholder = 'lorem ipsum'
    component.maxLength = maxLength
    component.placeholder = placeholder

    fixture.detectChanges()

    const inputDebugElement: DebugElement = getDebugElementByCss('.project-title__input', fixture)

    expect(inputDebugElement.properties.placeholder).toBe(placeholder)
    expect(inputDebugElement.attributes.maxlength).toBe(String(maxLength))
  })

  it('should not show heading by default if project title is not passed as props', (): void => {
    fixture.detectChanges()

    const titleDebugElement: DebugElement = getDebugElementByCss('.project-title__text', fixture)

    expect(titleDebugElement).toBeFalsy()
  })

  it(`should not show heading if input field's blur event is triggered title as empty string`, (): void => {
    fixture.detectChanges()

    const inputDebugElement: DebugElement = getDebugElementByCss('.project-title__input', fixture)

    inputDebugElement.triggerEventHandler('blur', { target: { value: '' } })
    fixture.detectChanges()

    const titleDebugElement: DebugElement = getDebugElementByCss('.project-title__text', fixture)

    expect(titleDebugElement).toBeFalsy()
  })

  it('should show heading if project title is present in input props', (): void => {
    const title = 'lorem ipsum'
    component.projectData = { id: 1, title }

    fixture.detectChanges()
    const titleElement: HTMLElement = getDebugElementByCss('.project-title__text', fixture).nativeElement
    const inputDebugElement: DebugElement = getDebugElementByCss('.project-title__input', fixture)

    expect(titleElement.innerText).toContain(title)
    expect(inputDebugElement).toBeFalsy()
  })

  it('should emit title if text is filled in input field and blurred', (): void => {
    const title = 'lorem ipsum'
    const event = { target: { value: title }}
    const titleBlur = spyOn(component.titleBlur, 'emit')
    fixture.detectChanges()

    const inputDebugElement: DebugElement = getDebugElementByCss('.project-title__input', fixture)
    inputDebugElement.triggerEventHandler('blur', event)

    fixture.detectChanges()
    const titleElement: HTMLElement = getDebugElementByCss('.project-title__text', fixture).nativeElement

    expect(titleBlur).toHaveBeenCalledWith({ title })
    expect(titleElement.innerText).toContain(title)
  })

  it('should contain edit icon', (): void => {
    const iconDebugElement: DebugElement = getDebugElementByCss('.icon-ic_edit_small', fixture)

    expect(iconDebugElement).toBeTruthy()
  })
})
