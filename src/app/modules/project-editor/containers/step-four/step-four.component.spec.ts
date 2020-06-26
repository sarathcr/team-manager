import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'

import { TranslateModule } from '@ngx-translate/core'

import { StepFourComponent } from './step-four.component'
import { InfoToolTipComponent } from '../../components/info-tooltip/info-tooltip.component'

import { EditorService } from '../../services/editor/editor.service'
import { ProjectEntityService } from '../../store/entity/project/project-entity.service'
import { StepStatusEntityService } from '../../store/entity/step-status/step-status-entity.service'

class EditorServiceStub { }
class ProjectEntityServiceStub { }
class StepStatusEntityServiceStub { }
class RouterStub { }

describe('StepFourComponent', (): void => {
  let component: StepFourComponent
  let fixture: ComponentFixture<StepFourComponent>

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [ StepFourComponent, InfoToolTipComponent ],
      providers: [
        { provider: EditorService, useClass: EditorServiceStub },
        { provide: ProjectEntityService, useClass: ProjectEntityServiceStub },
        { provide: StepStatusEntityService, useClass: StepStatusEntityServiceStub },
        { provide: Router, useClass: RouterStub }
      ],
      imports: [ TranslateModule.forRoot() ]
    })

    fixture = TestBed.createComponent(StepFourComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
