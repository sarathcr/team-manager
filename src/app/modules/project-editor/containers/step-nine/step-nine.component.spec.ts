import { ComponentFixture, TestBed } from '@angular/core/testing'

import { StepNineComponent } from './step-nine.component'
import { TextareaComponent } from '../../components/textarea/textarea.component'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { InfoToolTipComponent } from '../../components/info-tooltip/info-tooltip.component'

import { EditorService } from '../../services/editor/editor.service'
import { ProjectEntityService } from '../../services/project/project-entity.service'
import { StepStatusEntityService } from '../../services/step-status/step-status-entity.service'
import { Router } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { StatusComponent } from '../../components/status/status.component'

class EditorServiceStub { }
class ProjectEntityServiceStub { }
class StepStatusEntityServiceStub { }
class RouterStub { }

describe('StepNineComponent', () => {
  let component: StepNineComponent
  let fixture: ComponentFixture<StepNineComponent>
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        StepNineComponent,
        TextareaComponent,
        ButtonComponent,
        StatusComponent,
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

    fixture = TestBed.createComponent(StepNineComponent)
    component = fixture.componentInstance
  })

  afterEach((): void => {
    spyOn(component, 'isFormUpdated').and.returnValue(false)
    
    fixture.destroy()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
