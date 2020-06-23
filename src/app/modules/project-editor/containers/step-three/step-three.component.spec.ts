import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { Router } from '@angular/router'

import { NgScrollbar } from 'ngx-scrollbar'
import { BsModalService } from 'ngx-bootstrap/modal'

import { StepThreeComponent } from './step-three.component'
import { TextareaComponent } from '../../components/textarea/textarea.component'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { InfoToolTipComponent } from '../../components/info-tooltip/info-tooltip.component'
import { StatusComponent } from '../../components/status/status.component'

import { EditorService } from '../../services/editor/editor.service'
import { ProjectEntityService } from '../../store/entity/project/project-entity.service'
import { StepStatusEntityService } from '../../store/entity/step-status/step-status-entity.service'

class EditorServiceStub { }
class ProjectEntityServiceStub { }
class StepStatusEntityServiceStub { }
class RouterStub { }
class BsModalServiceStub {
  getModalsCount = (): number => 0
}

describe('StepThreeComponent', (): void => {
  let component: StepThreeComponent
  let fixture: ComponentFixture<StepThreeComponent>


  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [
        StepThreeComponent,
        TextareaComponent,
        ButtonComponent,
        InfoToolTipComponent,
        StatusComponent,
        NgScrollbar
      ],
      providers: [
        { provider: EditorService, useClass: EditorServiceStub },
        { provide: ProjectEntityService, useClass: ProjectEntityServiceStub },
        { provide: StepStatusEntityService, useClass: StepStatusEntityServiceStub },
        { provide: Router, useClass: RouterStub },
        { provide: BsModalService, useClass: BsModalServiceStub },

      ],
      imports: [ TranslateModule.forRoot() ]
    })

    fixture = TestBed.createComponent(StepThreeComponent)
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
