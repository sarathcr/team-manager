import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { Router } from '@angular/router'

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'

import { StepOneComponent } from './step-one.component'
import { DropdownComponent } from 'src/app/shared/components/dropdown/dropdown.component'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { InfoToolTipComponent } from '../../components/info-tooltip/info-tooltip.component'
import { StatusComponent } from '../../components/status/status.component'

import { EditorService } from '../../services/editor/editor.service'
import { ProjectEntityService } from '../../store/entity/project/project-entity.service'
import { StepStatusEntityService } from '../../store/entity/step-status/step-status-entity.service'
import { CountryEntityService } from '../../store/entity/country/country-entity.service'
import { RegionEntityService } from '../../store/entity/region/region-entity.service'
import { AcademicYearEntityService } from '../../store/entity/academic-year/academic-year-entity.service'
import { GradeEntityService } from '../../store/entity/grade/grade-entity.service'
import { GradeDataService } from '../../store/entity/grade/grade-data.service'
import { SubjectEntityService } from '../../store/entity/subject/subject-entity.service'
import { SubjectDataService } from '../../store/entity/subject/subject-data.service'

class EditorServiceStub { }
class ProjectEntityServiceStub { }
class StepStatusEntityServiceStub { }
class CountryEntityServiceStub { }
class RegionEntityServiceStub { }
class AcademicYearEntityServiceStub { }
class GradeEntityServiceStub { }
class GradeDataServiceStub { }
class SubjectEntityServiceStub { }
class SubjectDataServiceStub { }
class RouterStub { }

describe('StartPointComponent', () => {
  let component: StepOneComponent
  let fixture: ComponentFixture<StepOneComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        StepOneComponent,
        DropdownComponent,
        ButtonComponent,
        InfoToolTipComponent,
        StatusComponent
      ],
      providers: [
        { provider: EditorService, useClass: EditorServiceStub },
        { provide: ProjectEntityService, useClass: ProjectEntityServiceStub },
        { provide: StepStatusEntityService, useClass: StepStatusEntityServiceStub },
        { provide: CountryEntityService, useClass: CountryEntityServiceStub },
        { provide: RegionEntityService, useClass: RegionEntityServiceStub },
        { provide: AcademicYearEntityService, useClass: AcademicYearEntityServiceStub },
        { provide: GradeEntityService, useClass: GradeEntityServiceStub },
        { provide: GradeDataService, useClass: GradeDataServiceStub },
        { provide: SubjectEntityService, useClass: SubjectEntityServiceStub },
        { provide: SubjectDataService, useClass: SubjectDataServiceStub },
        { provide: Router, useClass: RouterStub }
      ],
      imports: [ TranslateModule.forRoot(), NgMultiSelectDropDownModule ]
    })

    fixture = TestBed.createComponent(StepOneComponent)
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
