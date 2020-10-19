import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'

import { NgxDropzoneComponent } from 'ngx-dropzone'

import { ButtonComponent } from 'src/app/common-shared/components/button/button.component'
import { InfoToolTipComponent } from 'src/app/common-shared/components/info-tooltip/info-tooltip.component'
import { InputComponent } from 'src/app/common-shared/components/input/input.component'
import { ValidatorComponent } from 'src/app/common-shared/components/validator/validator.component'
import { StepStatusComponent } from '../../components/step-status/step-status.component'
import { StepSixComponent } from './step-six.component'

import { ImageUploadComponent } from 'src/app/common-shared/components/image-upload/image-upload.component'
import { EditorService } from '../../services/editor/editor.service'
import { ProjectEntityService } from '../../store/entity/project/project-entity.service'
import { StepStatusEntityService } from '../../store/entity/step-status/step-status-entity.service'

class EditorServiceStub {}
class ProjectEntityServiceStub {}
class StepStatusEntityServiceStub {}
class RouterStub {}

describe('StepSixComponent', (): void => {
  let component: StepSixComponent
  let fixture: ComponentFixture<StepSixComponent>

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [
        StepSixComponent,
        ButtonComponent,
        StepStatusComponent,
        ImageUploadComponent,
        NgxDropzoneComponent,
        InfoToolTipComponent,
        InputComponent,
        ValidatorComponent,
      ],
      providers: [
        { provider: EditorService, useClass: EditorServiceStub },
        { provide: ProjectEntityService, useClass: ProjectEntityServiceStub },
        {
          provide: StepStatusEntityService,
          useClass: StepStatusEntityServiceStub,
        },
        { provide: Router, useClass: RouterStub },
      ],
      imports: [TranslateModule.forRoot(), HttpClientTestingModule],
    })

    fixture = TestBed.createComponent(StepSixComponent)
    component = fixture.componentInstance
  })

  afterEach((): void => {
    spyOn(component, 'isFormUpdated').and.returnValue(false)

    fixture.destroy()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })

  // it('creative title should have max-length 70 ', () => {
  //   //test title
  // })
})
