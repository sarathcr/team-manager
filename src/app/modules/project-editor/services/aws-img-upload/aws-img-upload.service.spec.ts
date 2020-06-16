import { TestBed } from '@angular/core/testing';

import { AwsImgUploadService } from './aws-img-upload.service';

describe('AwsImgUploadService', () => {
  let service: AwsImgUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwsImgUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
