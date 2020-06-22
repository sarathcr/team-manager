import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NgxDropzoneComponent } from 'ngx-dropzone';

import { ImageUploadComponent } from './image-upload.component'

import { AwsImgUploadService } from '../../services/aws-img-upload/aws-img-upload.service'

describe('ImageUploadComponent', (): void => {
  let component: ImageUploadComponent
  let fixture: ComponentFixture<ImageUploadComponent>

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [ ImageUploadComponent, NgxDropzoneComponent ],
      providers: [ AwsImgUploadService ],
      imports: [ HttpClientTestingModule ]
    })

    fixture = TestBed.createComponent(ImageUploadComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
