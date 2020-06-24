import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

import { EditorSidebarComponent } from './editor-sidebar.component'
import { StepMenuComponent } from '../step-menu/step-menu.component'

describe('EditorSidebarComponent', (): void => {
  let component: EditorSidebarComponent
  let fixture: ComponentFixture<EditorSidebarComponent>

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [
        EditorSidebarComponent,
        StepMenuComponent
      ],
      imports: [ RouterTestingModule ]
    })

    fixture = TestBed.createComponent(EditorSidebarComponent)
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
    const view = 'View'
    const debugViewElement: DebugElement = fixture
                                            .debugElement
                                            .query(By.css('.project-editor-sidebar__view'))
    const viewElement: HTMLElement = debugViewElement.nativeElement
    component.view = view

    fixture.detectChanges()

    expect(viewElement.innerText).toContain(view)
  })

  it('should repeatly render step menu directives as number of steps', (): void => {
    const steps = [
      { stepid: 1, state: 'PENDING', name: '' },
      { stepid: 2, state: 'PENDING', name: '' }
    ]
    component.steps = steps

    fixture.detectChanges()

    const debugStepMenuElement: DebugElement[] = fixture
                                                  .debugElement
                                                  .queryAll(By.directive(StepMenuComponent))
    expect(debugStepMenuElement.length).toBe(steps.length)
  })
})
