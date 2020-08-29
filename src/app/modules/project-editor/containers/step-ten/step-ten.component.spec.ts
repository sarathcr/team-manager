import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'

import { TranslateModule } from '@ngx-translate/core'

import { InfoToolTipComponent } from 'src/app/shared/components/info-tooltip/info-tooltip.component'
import { StepTenComponent } from './step-ten.component'

import { EditorService } from '../../services/editor/editor.service'
import { ProjectEntityService } from '../../store/entity/project/project-entity.service'
import { StepStatusEntityService } from '../../store/entity/step-status/step-status-entity.service'

class EditorServiceStub {}
class ProjectEntityServiceStub {}
class StepStatusEntityServiceStub {}
class RouterStub {}

describe('StepTenComponent', (): void => {
  let component: StepTenComponent
  let fixture: ComponentFixture<StepTenComponent>

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [StepTenComponent, InfoToolTipComponent],
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

    fixture = TestBed.createComponent(StepTenComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
