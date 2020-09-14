import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'

import { TranslateModule } from '@ngx-translate/core'

import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { InfoToolTipComponent } from 'src/app/shared/components/info-tooltip/info-tooltip.component'
import { StepStatusComponent } from '../../components/step-status/step-status.component'
import { StepFourComponent } from './step-four.component'

import { BsModalService } from 'ngx-bootstrap/modal'
import { CurriculumBasicSkillsEntityService } from 'src/app/modules/project-editor/store/entity/curriculum-basic-skills/curriculum-basic-skills-entity.service'
import { ContentService } from '../../services/contents/contents.service'
import { EditorService } from '../../services/editor/editor.service'
import { CurriculumEntityService } from '../../store/entity/curriculum/curriculum-entity.service'
import { ProjectEntityService } from '../../store/entity/project/project-entity.service'
import { StepStatusEntityService } from '../../store/entity/step-status/step-status-entity.service'

class EditorServiceStub {}
class ProjectEntityServiceStub {}
class StepStatusEntityServiceStub {}
class CurriculumBasicSkillsEntityServiceStub {}
class BsModalServiceStub {}
class ContentServiceStub {}
class RouterStub {}
class CurriculumEntityServiceStub {}

describe('StepFourComponent', (): void => {
  let component: StepFourComponent
  let fixture: ComponentFixture<StepFourComponent>

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [
        StepFourComponent,
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
        {
          provide: CurriculumBasicSkillsEntityService,
          useClass: CurriculumBasicSkillsEntityServiceStub,
        },
        { provide: ContentService, useClass: ContentServiceStub },
        { provide: BsModalService, useClass: BsModalServiceStub },
        { provide: Router, useClass: RouterStub },
        {
          provide: CurriculumEntityService,
          useClass: CurriculumEntityServiceStub,
        },
      ],
      imports: [TranslateModule.forRoot()],
    })

    fixture = TestBed.createComponent(StepFourComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
