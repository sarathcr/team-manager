import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AwsImgUploadService } from './aws-img-upload.service'

describe('AwsImgUploadService', (): void => {
  let service: AwsImgUploadService

  beforeEach((): void => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    })
    service = TestBed.inject(AwsImgUploadService)
  })

  it('should be created', (): void => {
    expect(service).toBeTruthy()
  })
})
