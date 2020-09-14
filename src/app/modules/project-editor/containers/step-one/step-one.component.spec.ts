import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'

import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { InfoToolTipComponent } from 'src/app/shared/components/info-tooltip/info-tooltip.component'
import { SelectComponent } from 'src/app/shared/components/select/select.component'
import { StepStatusComponent } from '../../components/step-status/step-status.component'
import { StepOneComponent } from './step-one.component'

import { EditorService } from '../../services/editor/editor.service'
import { AcademicYearEntityService } from '../../store/entity/academic-year/academic-year-entity.service'
import { CountryEntityService } from '../../store/entity/country/country-entity.service'
import { CurriculumGradesDataService } from '../../store/entity/curriculum-grades/curriculum-grades-data.service'
import { CurriculumGradesEntityService } from '../../store/entity/curriculum-grades/curriculum-grades-entity.service'
import { CurriculumDataService } from '../../store/entity/curriculum/curriculum-data.service'
import { CurriculumEntityService } from '../../store/entity/curriculum/curriculum-entity.service'
import { ProjectEntityService } from '../../store/entity/project/project-entity.service'
import { RegionEntityService } from '../../store/entity/region/region-entity.service'
import { StageDataService } from '../../store/entity/stage/stage-data.service'
import { StageEntityService } from '../../store/entity/stage/stage-entity.service'
import { StepStatusEntityService } from '../../store/entity/step-status/step-status-entity.service'

class EditorServiceStub {}
class ProjectEntityServiceStub {}
class StepStatusEntityServiceStub {}
class CountryEntityServiceStub {}
class RegionEntityServiceStub {}
class AcademicYearEntityServiceStub {}
class StageEntityServiceStub {}
class StageDataServiceStub {}
class CurriculumEntityServiceStub {}
class CurriculumDataServiceStub {}
class CurriculumGradesEntityServiceStub {}
class CurriculumGradesDataServiceStub {}
class RouterStub {}

describe('StartPointComponent', () => {
  let component: StepOneComponent
  let fixture: ComponentFixture<StepOneComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        StepOneComponent,
        SelectComponent,
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
        { provide: CountryEntityService, useClass: CountryEntityServiceStub },
        { provide: RegionEntityService, useClass: RegionEntityServiceStub },
        {
          provide: AcademicYearEntityService,
          useClass: AcademicYearEntityServiceStub,
        },
        { provide: StageEntityService, useClass: StageEntityServiceStub },
        { provide: StageDataService, useClass: StageDataServiceStub },
        {
          provide: CurriculumEntityService,
          useClass: CurriculumEntityServiceStub,
        },
        { provide: CurriculumDataService, useClass: CurriculumDataServiceStub },
        {
          provide: CurriculumGradesEntityService,
          useClass: CurriculumGradesEntityServiceStub,
        },
        {
          provide: CurriculumGradesDataService,
          useClass: CurriculumGradesDataServiceStub,
        },
        { provide: Router, useClass: RouterStub },
      ],
      imports: [TranslateModule.forRoot(), NgMultiSelectDropDownModule],
    })

    fixture = TestBed.createComponent(StepOneComponent)
    component = fixture.componentInstance
  })

  afterEach((): void => {
    // spyOn(component, 'isFormUpdated').and.returnValue()

    fixture.destroy()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
