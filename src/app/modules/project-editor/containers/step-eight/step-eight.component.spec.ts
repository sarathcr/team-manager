import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'

import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { InfoToolTipComponent } from 'src/app/shared/components/info-tooltip/info-tooltip.component'
import { TextareaComponent } from 'src/app/shared/components/textarea/textarea.component'
import { StepStatusComponent } from '../../components/step-status/step-status.component'
import { StepEightComponent } from './step-eight.component'

import { EditorService } from '../../services/editor/editor.service'
import { ProjectEntityService } from '../../store/entity/project/project-entity.service'
import { StepStatusEntityService } from '../../store/entity/step-status/step-status-entity.service'

class EditorServiceStub {}
class ProjectEntityServiceStub {}
class StepStatusEntityServiceStub {}
class RouterStub {}

describe('FinalProductComponent', (): void => {
  let component: StepEightComponent
  let fixture: ComponentFixture<StepEightComponent>

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [
        StepEightComponent,
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

    fixture = TestBed.createComponent(StepEightComponent)
    component = fixture.componentInstance
  })

  afterEach((): void => {
    component.isFormUpdated = false

    fixture.destroy()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
