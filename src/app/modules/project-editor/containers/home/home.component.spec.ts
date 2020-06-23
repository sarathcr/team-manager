import { ComponentFixture, TestBed } from '@angular/core/testing'

import { HomeComponent } from './home.component'
import { HeaderComponent } from 'src/app/shared/components/header/header.component'
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component'
import { CreateProjectComponent } from '../../components/create-project/create-project.component'

import { ProjectEntityService } from '../../services/project/project-entity.service'

class ProjectEntityServiceStub { }

describe('HomeComponent', (): void => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>
  
  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, HeaderComponent, SidebarComponent, CreateProjectComponent ],
      providers: [ { provide: ProjectEntityService, useClass: ProjectEntityServiceStub } ]
    })

    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
