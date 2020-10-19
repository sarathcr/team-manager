import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'

import { TranslateModule } from '@ngx-translate/core'

import { ButtonComponent } from 'src/app/common-shared/components/button/button.component'
import { InfoToolTipComponent } from 'src/app/common-shared/components/info-tooltip/info-tooltip.component'
import { TextareaComponent } from 'src/app/common-shared/components/textarea/textarea.component'
import { StepStatusComponent } from '../../components/step-status/step-status.component'
import { StepNineComponent } from './step-nine.component'

import { EditorService } from '../../services/editor/editor.service'
import { ProjectEntityService } from '../../store/entity/project/project-entity.service'
import { StepStatusEntityService } from '../../store/entity/step-status/step-status-entity.service'

class EditorServiceStub {}
class ProjectEntityServiceStub {}
class StepStatusEntityServiceStub {}
class RouterStub {}

describe('StepNineComponent', () => {
  let component: StepNineComponent
  let fixture: ComponentFixture<StepNineComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        StepNineComponent,
        TextareaComponent,
        ButtonComponent,
        StepStatusComponent,
        InfoToolTipComponent,
      ],
      providers: [
        { provider: EditorService, useClass: EditorServiceStub },
        { provide: ProjectEntityService, useClass: ProjectEntityServiceStub },
        {
          provide: StepStatusEntityService,
          useClass: StepStatusEntityServiceStub,
        },
        { provide: Router, useClass: RouterStub },
      ],
      imports: [TranslateModule.forRoot()],
    })

    fixture = TestBed.createComponent(StepNineComponent)
    component = fixture.componentInstance
  })

  afterEach((): void => {
    component.isFormUpdated = false

    fixture.destroy()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
