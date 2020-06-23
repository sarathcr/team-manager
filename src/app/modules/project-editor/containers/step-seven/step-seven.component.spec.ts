import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { Router } from '@angular/router'

import { NgScrollbar } from 'ngx-scrollbar'

import { StepSevenComponent } from './step-seven.component'
import { StatusComponent } from '../../components/status/status.component'
import { InfoToolTipComponent } from '../../components/info-tooltip/info-tooltip.component'
import { TextareaBulletsComponent } from '../../components/textarea-bullets/textarea-bullets.component'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'

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
        InfoToolTipComponent,
        TextareaBulletsComponent,
        ButtonComponent,
        NgScrollbar
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
    spyOn(component, 'isFormUpdated').and.returnValue(false)

    fixture.destroy()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()

  })
})
