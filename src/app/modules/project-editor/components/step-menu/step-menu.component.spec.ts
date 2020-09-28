import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { RouterTestingModule } from '@angular/router/testing'
import { TranslateModule } from '@ngx-translate/core'

import { Step } from '../../constants/model/project.model'
import { StepMenuComponent } from './step-menu.component'

describe('StepMenuComponent', (): void => {
  let component: StepMenuComponent
  let fixture: ComponentFixture<StepMenuComponent>

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [StepMenuComponent],
      imports: [RouterTestingModule, TranslateModule.forRoot()],
    })

    fixture = TestBed.createComponent(StepMenuComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })

  it('should render classes and components for "DONE" step state', (): void => {
    const step: Step = { state: 'DONE', stepid: 1, name: 'lorem ipsum' }
    component.step = step

    fixture.detectChanges()

    const menuElement: DebugElement = fixture.debugElement.query(
      By.css('.menu')
    )
    const menuStepIcon: DebugElement = menuElement.query(
      By.css('.menu__step .icon-ic_check')
    )

    expect(menuElement.classes.menu_done).toBeTruthy()
    expect(menuStepIcon).toBeTruthy()
  })

  it('should render classes and components for "INPROCESS" step state', (): void => {
    const step: Step = { state: 'INPROCESS', stepid: 1, name: 'lorem ipsum' }
    component.step = step

    fixture.detectChanges()

    const menuDebugElement: DebugElement = fixture.debugElement.query(
      By.css('.menu')
    )
    const menuElement: HTMLElement = menuDebugElement.nativeElement

    expect(menuDebugElement.classes.menu_inprocess).toBeTruthy()
    expect(menuElement.innerText).toContain(step.name)
    expect(menuElement.innerText).toContain(String(step.stepid))
  })
})
