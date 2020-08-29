import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { RouterTestingModule } from '@angular/router/testing'
import { BsModalService } from 'ngx-bootstrap/modal'
import { ProjectTitleComponent } from '../project-title/project-title.component'
import { EditorHeaderComponent } from './editor-header.component'

class BsModalServiceStub {}

describe('EditorHeaderComponent', (): void => {
  let component: EditorHeaderComponent
  let fixture: ComponentFixture<EditorHeaderComponent>

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [EditorHeaderComponent, ProjectTitleComponent],
      providers: [{ provide: BsModalService, useClass: BsModalServiceStub }],
      imports: [RouterTestingModule],
    })

    fixture = TestBed.createComponent(EditorHeaderComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })

  it('should have logo', (): void => {
    const logoDebugElement: DebugElement = fixture.debugElement.query(
      By.css('.app-logo__img')
    )
    const logoSrc: string = logoDebugElement.attributes.src

    expect(logoSrc).toBeDefined()
  })

  it('should have a logo with wrapper link to root page', (): void => {
    const logoDebugElement: DebugElement = fixture.debugElement.query(
      By.css('.app-logo__img')
    )
    const logoWrapper: DebugElement = logoDebugElement.parent

    expect(logoWrapper.attributes.routerLink).toBe('/')
  })

  it('should have project title directive', (): void => {
    const projectTitleDebugElement: DebugElement = fixture.debugElement.query(
      By.directive(ProjectTitleComponent)
    )

    expect(projectTitleDebugElement).toBeTruthy()
  })
})
