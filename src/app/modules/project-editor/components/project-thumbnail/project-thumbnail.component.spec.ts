import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TranslateModule } from '@ngx-translate/core'

import { ProjectThumbnailComponent } from './project-thumbnail.component'

describe('ProjectThumbnailComponent', (): void => {
  let component: ProjectThumbnailComponent
  let fixture: ComponentFixture<ProjectThumbnailComponent>
  
  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [ ProjectThumbnailComponent ],
      imports: [ TranslateModule.forRoot() ]
    })

    fixture = TestBed.createComponent(ProjectThumbnailComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
