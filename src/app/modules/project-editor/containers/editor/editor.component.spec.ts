import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { ActivatedRoute, RouterOutlet } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { FormsModule } from '@angular/forms'
import { DebugElement } from '@angular/core'

import { TabsModule } from 'ngx-bootstrap/tabs'

import { EditorComponent } from './editor.component'
import { LoaderComponent } from '../../../../shared/components/loader/loader.component'
import { ContextualHelpComponent } from '../contextual-help/contextual-help.component'
import { EditorHeaderComponent } from '../../components/editor-header/editor-header.component'
import { EditorSidebarComponent } from '../../components/editor-sidebar/editor-sidebar.component'
import { ProjectTitleComponent } from '../../components/project-title/project-title.component'
import { StepMenuComponent } from '../../components/step-menu/step-menu.component'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'

import { EditorService } from '../../services/editor/editor.service'
import { TranslateModule } from '@ngx-translate/core'
import { HelpEntityService } from '../../store/entity/help/help-entity.service'
import { BehaviorSubject } from 'rxjs'

class ActivatedRouteStub {
  private id: number | 'create'

  changeId(id: number | 'create'): void {
    this.id = id
  }

  get snapshot(): object {
    return {
      paramMap: {
        get: () => this.id
      }
    }
  }
}

class EditorServiceStub {
  loaded$ = new BehaviorSubject(true)
  getProject(): void { }
  clearData(): void { }
  createSteps(): void { }
  getStepData(): void { }
  getStepStatus(): void { }
}

class HelpEntityServiceStub { }

describe('EditorComponent', (): void => {
  let component: EditorComponent
  let fixture: ComponentFixture<EditorComponent>
  let route

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [
        EditorComponent,
        LoaderComponent,
        ContextualHelpComponent,
        EditorHeaderComponent,
        EditorSidebarComponent,
        ProjectTitleComponent,
        StepMenuComponent,
        ButtonComponent
      ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        TabsModule.forRoot(),
        FormsModule
      ],
      providers: [
        { provide: EditorService, useClass: EditorServiceStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: HelpEntityService, useClass: HelpEntityServiceStub },
      ]
    })

    fixture = TestBed.createComponent(EditorComponent)
    component = fixture.componentInstance
  })

  afterEach(() => {
    fixture.destroy()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })

  it('should have a router outlet', (): void => {
    fixture.detectChanges()
    const debugElement: DebugElement = fixture.debugElement.query(By.directive(RouterOutlet))

    expect(debugElement).not.toBeNull()
  })

  it('should get project from url', (): void => {
    const editor: EditorService = TestBed.inject(EditorService)
    const project = spyOn(editor, 'getProject')

    route = TestBed.inject(ActivatedRoute)
    route.changeId(1)

    fixture.detectChanges()

    expect(project).toHaveBeenCalledWith(1)
  })

  it(`should get project from url if route param id is 'create'`, (): void => {
    const editor = TestBed.inject(EditorService)
    const project = spyOn(editor, 'getProject')
    const create = 'create'
    route = TestBed.inject(ActivatedRoute)
    route.changeId(create)

    fixture.detectChanges()

    expect(project).toHaveBeenCalledWith(create)
  })

  it('should execute clearData method of editor service on destroy', (): void => {
    const editor: EditorService = TestBed.inject(EditorService)
    const clearData = spyOn(editor, 'clearData')

    fixture.destroy()

    expect(clearData).toHaveBeenCalled()
  })

})
