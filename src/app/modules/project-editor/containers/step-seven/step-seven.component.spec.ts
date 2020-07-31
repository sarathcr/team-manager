import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { Router } from '@angular/router'

import { StepSevenComponent } from './step-seven.component'
import { StatusComponent } from '../../components/status/status.component'
import { TextareaComponent } from 'src/app/shared/components/textarea/textarea.component'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { InfoToolTipComponent } from 'src/app/shared/components/info-tooltip/info-tooltip.component'

import { EditorService } from '../../services/editor/editor.service'
import { ProjectEntityService } from '../../store/entity/project/project-entity.service'
import { StepStatusEntityService } from '../../store/entity/step-status/step-status-entity.service'

class EditorServiceStub { }
class ProjectEntityServiceStub { }
class StepStatusEntityServiceStub { }
class RouterStub { }

describe('StepSevenComponent', () => {
  let component: StepSevenComponent
  let fixture: ComponentFixture<StepSevenComponent>


  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [
        StepSevenComponent,
        StatusComponent,
        TextareaComponent,
        ButtonComponent,
        InfoToolTipComponent
      ],
      providers: [
        { provider: EditorService, useClass: EditorServiceStub },
        { provide: ProjectEntityService, useClass: ProjectEntityServiceStub },
        { provide: StepStatusEntityService, useClass: StepStatusEntityServiceStub },
        { provide: Router, useClass: RouterStub }
      ],
      imports: [ TranslateModule.forRoot() ]
    })

    fixture = TestBed.createComponent(StepSevenComponent)
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
