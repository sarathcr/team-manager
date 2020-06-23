import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CreateProjectComponent } from './create-project.component'

describe('CreateProjectComponent', (): void => {
  let component: CreateProjectComponent
  let fixture: ComponentFixture<CreateProjectComponent>

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [ CreateProjectComponent ]
    })

    fixture = TestBed.createComponent(CreateProjectComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
