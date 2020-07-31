import { ComponentFixture, TestBed } from '@angular/core/testing'

import { OutputViewComponent } from './output-view.component'
import { RouterTestingModule } from '@angular/router/testing'
import { ProjectEntityService } from 'src/app/modules/project-editor/store/entity/project/project-entity.service'
import { BehaviorSubject, Observable } from 'rxjs'

class ProjectEntityServiceStub {
  entities$ = new BehaviorSubject({})
  getByKey(): Observable<{}> {
    return new BehaviorSubject({})
  }
}

describe('OutputViewComponent', () => {
  let component: OutputViewComponent
  let fixture: ComponentFixture<OutputViewComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutputViewComponent],
      providers: [{ provide: ProjectEntityService, useClass: ProjectEntityServiceStub }],
      imports: [RouterTestingModule]
    })
    fixture = TestBed.createComponent(OutputViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
