import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'

import { TranslateModule } from '@ngx-translate/core'

import { StepFourComponent } from './step-four.component'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { StatusComponent } from '../../components/status/status.component'
import { InfoToolTipComponent } from 'src/app/shared/components/info-tooltip/info-tooltip.component'

import { EditorService } from '../../services/editor/editor.service'
import { ProjectEntityService } from '../../store/entity/project/project-entity.service'
import { StepStatusEntityService } from '../../store/entity/step-status/step-status-entity.service'
import {
  CurriculumBasicSkillsEntityService
} from 'src/app/modules/project-editor/store/entity/curriculum-basic-skills/curriculum-basic-skills-entity.service'
import { BsModalService } from 'ngx-bootstrap/modal'
import { ContentService } from '../../services/contents/contents.service'
import { GradeEntityService } from '../../store/entity/grade/grade-entity.service'

class EditorServiceStub { }
class ProjectEntityServiceStub { }
class StepStatusEntityServiceStub { }
class CurriculumBasicSkillsEntityServiceStub { }
class BsModalServiceStub { }
class GradeEntityServiceStub { }
class ContentServiceStub { }
class RouterStub { }

describe('StepFourComponent', (): void => {
  let component: StepFourComponent
  let fixture: ComponentFixture<StepFourComponent>

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [ StepFourComponent, ButtonComponent, StatusComponent, InfoToolTipComponent ],
      providers: [
        { provider: EditorService, useClass: EditorServiceStub },
        { provide: ProjectEntityService, useClass: ProjectEntityServiceStub },
        { provide: StepStatusEntityService, useClass: StepStatusEntityServiceStub },
        { provide: CurriculumBasicSkillsEntityService, useClass: CurriculumBasicSkillsEntityServiceStub },
        { provide: ContentService, useClass: ContentServiceStub },
        { provide: GradeEntityService, useClass: GradeEntityServiceStub },
        { provide: BsModalService, useClass: BsModalServiceStub },
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
