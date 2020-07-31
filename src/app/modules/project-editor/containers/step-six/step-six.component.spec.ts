import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { Router } from '@angular/router'
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { NgxDropzoneComponent } from 'ngx-dropzone'

import { StepSixComponent } from './step-six.component'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { StatusComponent } from '../../components/status/status.component'
import { ImageUploadComponent } from '../../components/image-upload/image-upload.component'
import { InfoToolTipComponent } from 'src/app/shared/components/info-tooltip/info-tooltip.component'
import { InputComponent } from 'src/app/shared/components/input/input.component'
import { ValidatorComponent } from 'src/app/shared/components/validator/validator.component'

import { EditorService } from '../../services/editor/editor.service'
import { ProjectEntityService } from '../../store/entity/project/project-entity.service'
import { StepStatusEntityService } from '../../store/entity/step-status/step-status-entity.service'

class EditorServiceStub { }
class ProjectEntityServiceStub { }
class StepStatusEntityServiceStub { }
class RouterStub { }

describe('StepSixComponent', (): void => {
  let component: StepSixComponent
  let fixture: ComponentFixture<StepSixComponent>


  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [
        StepSixComponent,
        ButtonComponent,
        StatusComponent,
        ImageUploadComponent,
        NgxDropzoneComponent,
        InfoToolTipComponent,
        InputComponent,
        ValidatorComponent
      ],
      providers: [
        { provider: EditorService, useClass: EditorServiceStub },
        { provide: ProjectEntityService, useClass: ProjectEntityServiceStub },
        { provide: StepStatusEntityService, useClass: StepStatusEntityServiceStub },
        { provide: Router, useClass: RouterStub }
      ],
      imports: [ TranslateModule.forRoot(), HttpClientTestingModule ]
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
