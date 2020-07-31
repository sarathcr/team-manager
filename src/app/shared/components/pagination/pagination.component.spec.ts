import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PaginationModule } from 'ngx-bootstrap/pagination'

import { PaginationComponent } from './pagination.component'

describe('PaginationComponent', () => {
  let component: PaginationComponent
  let fixture: ComponentFixture<PaginationComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationComponent ],
      imports: [ PaginationModule.forRoot() ]
    })
    fixture = TestBed.createComponent(PaginationComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
