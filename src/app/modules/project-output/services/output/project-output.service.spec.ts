import { HttpClientModule } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'

import { ProjectOutputService } from './project-output.service'

describe('ProjectOutputService', () => {
  let service: ProjectOutputService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ProjectOutputService],
    })
    service = TestBed.inject(ProjectOutputService)
  })
  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
