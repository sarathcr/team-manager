import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

import { SidebarComponent } from './sidebar.component'
import { StepMenuComponent } from '../step-menu/step-menu.component'

describe('SidebarComponent', (): void => {
  let component: SidebarComponent
  let fixture: ComponentFixture<SidebarComponent>

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [
        SidebarComponent,
        StepMenuComponent
      ],
      imports: [ RouterTestingModule ]
    })

    fixture = TestBed.createComponent(SidebarComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })

  it('should render title', (): void => {
    const title = 'lorem ipsum'
    component.title = title
    const debugSidebarTitleElement: DebugElement = fixture
                                                    .debugElement
                                                    .query(By.css('.project-editor-sidebar__title'))
    const sidebarTitleElement: HTMLElement = debugSidebarTitleElement.nativeElement

    fixture.detectChanges()


    expect(sidebarTitleElement.innerText).toContain(title)
  })

  it('should render view', (): void => {
    const title = 'View'
    const debugTitleElement: DebugElement = fixture
                                            .debugElement
                                            .query(By.css('.project-editor-sidebar__title'))
    const titleElement: HTMLElement = debugTitleElement.nativeElement
    component.title = title

    fixture.detectChanges()

    expect(titleElement.innerText).toContain(title)
  })

  it('should repeatly render step menu directives as number of steps', (): void => {
    const steps = [
      { stepid: 1, state: 'PENDING', name: '' },
      { stepid: 2, state: 'PENDING', name: '' },
      { stepid: 3, state: 'PENDING', name: '' },
      { stepid: 4, state: 'PENDING', name: '' },
      { stepid: 5, state: 'PENDING', name: '' },
      { stepid: 6, state: 'PENDING', name: '' },
      { stepid: 7, state: 'PENDING', name: '' },
      { stepid: 8, state: 'PENDING', name: '' },
      { stepid: 9, state: 'PENDING', name: '' },
      { stepid: 10, state: 'PENDING', name: '' }
    ]
    component.steps = steps

    fixture.detectChanges()

    const debugStepMenuElement: DebugElement[] = fixture
                                                  .debugElement
                                                  .queryAll(By.directive(StepMenuComponent))
    expect(debugStepMenuElement.length).toBe(steps.length)
  })
})
