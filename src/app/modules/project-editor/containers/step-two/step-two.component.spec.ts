import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { Router } from '@angular/router'

import { NgScrollbar } from 'ngx-scrollbar'

import { StepTwoComponent } from './step-two.component'
import {
  TextareaBulletsComponent
} from '../../components/textarea-bullets/textarea-bullets.component'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { InfoToolTipComponent } from '../../components/info-tooltip/info-tooltip.component'
import { StatusComponent } from '../../components/status/status.component'

import { EditorService } from '../../services/editor/editor.service'
import { ProjectEntityService } from '../../services/project/project-entity.service'
import { StepStatusEntityService } from '../../services/step-status/step-status-entity.service'

class EditorServiceStub { }
class ProjectEntityServiceStub { }
class StepStatusEntityServiceStub { }
class RouterStub { }

describe('TematicaComponent', (): void => {
  let component: StepTwoComponent
  let fixture: ComponentFixture<StepTwoComponent>


  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [
        StepTwoComponent,
        TextareaBulletsComponent,
        ButtonComponent,
        InfoToolTipComponent,
        StatusComponent,
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
    
    fixture = TestBed.createComponent(StepTwoComponent)
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
