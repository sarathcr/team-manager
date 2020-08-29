import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MainHeaderComponent } from 'src/app/shared/components/main-header/main-header.component'
import { MainSidebarComponent } from 'src/app/shared/components/main-sidebar/main-sidebar.component'
import { CreateProjectComponent } from '../../components/create-project/create-project.component'
import { HomeComponent } from './home.component'

import { ProjectListEntityService } from '../../store/entity/project-list/project-list-entity.service'
import { ProjectEntityService } from '../../store/entity/project/project-entity.service'

class ProjectEntityServiceStub {}
class ProjectListEntityServiceStub {}

describe('HomeComponent', (): void => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        MainHeaderComponent,
        MainSidebarComponent,
        CreateProjectComponent,
      ],
      providers: [
        { provide: ProjectEntityService, useClass: ProjectEntityServiceStub },
        {
          provide: ProjectListEntityService,
          useClass: ProjectListEntityServiceStub,
        },
      ],
    })

    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
