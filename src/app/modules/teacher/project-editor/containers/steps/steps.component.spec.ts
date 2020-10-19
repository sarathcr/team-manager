import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { ActivatedRoute, RouterOutlet } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'

import { BsModalService } from 'ngx-bootstrap/modal'
import { TabsModule } from 'ngx-bootstrap/tabs'
import { BehaviorSubject } from 'rxjs'
import { ButtonComponent } from 'src/app/common-shared/components/button/button.component'
import { LoaderComponent } from 'src/app/common-shared/components/loader/loader.component'
import { HeaderComponent } from 'src/app/modules/project-output/components/header/header.component'

import { SidebarComponent } from '../../components/sidebar/sidebar.component'
import { StepMenuComponent } from '../../components/step-menu/step-menu.component'

import { TranslateModule } from '@ngx-translate/core'
import { Step } from '../../constants/model/project.model'
import { HelpEntityService } from '../../modules/contextual-help/store/entity/help/help-entity.service'
import { EditorService } from '../../services/editor/editor.service'
import { EditorComponent } from '../editor/editor.component'
import { ProjectTitleComponent } from '../project-title/project-title.component'

class ActivatedRouteStub {
  private id: number | 'create'

  changeId(id: number | 'create'): void {
    this.id = id
  }

  get snapshot(): object {
    return {
      paramMap: {
        get: () => this.id,
      },
    }
  }
}

class EditorServiceStub {
  loaded$ = new BehaviorSubject(true)
  steps: Step[] = [
    { stepid: 1, state: 'PENDING', name: '' },
    { stepid: 2, state: 'PENDING', name: '' },
    { stepid: 3, state: 'PENDING', name: '' },
    { stepid: 4, state: 'PENDING', name: '' },
    { stepid: 5, state: 'PENDING', name: '' },
    { stepid: 6, state: 'PENDING', name: '' },
    { stepid: 7, state: 'PENDING', name: '' },
    { stepid: 8, state: 'PENDING', name: '' },
    { stepid: 9, state: 'PENDING', name: '' },
    { stepid: 10, state: 'PENDING', name: '' },
  ]
  getProject(): void {}
  clearData(): void {}
  createSteps(): Step[] {
    return this.steps
  }
  getStepData(): void {}
  getStepStatus(): void {}
}

class BsModalServiceStub {
  show(): void {}
}

class HelpEntityServiceStub {}

describe('EditorComponent', (): void => {
  let component: EditorComponent
  let fixture: ComponentFixture<EditorComponent>
  let route

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [
        EditorComponent,
        LoaderComponent,
        HeaderComponent,
        SidebarComponent,
        ProjectTitleComponent,
        StepMenuComponent,
        ButtonComponent,
      ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        TabsModule.forRoot(),
        FormsModule,
      ],
      providers: [
        { provide: EditorService, useClass: EditorServiceStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: HelpEntityService, useClass: HelpEntityServiceStub },
        { provide: BsModalService, useClass: BsModalServiceStub },
      ],
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
    const debugElement: DebugElement = fixture.debugElement.query(
      By.directive(RouterOutlet)
    )

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

  it(`should call service method from url if route param id is 'create'`, (): void => {
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
