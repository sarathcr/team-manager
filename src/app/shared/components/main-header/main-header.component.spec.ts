import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MainHeaderComponent } from './main-header.component'

describe('MainHeaderComponent', (): void => {
  let component: MainHeaderComponent
  let fixture: ComponentFixture<MainHeaderComponent>

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [ MainHeaderComponent ]
    })

    fixture = TestBed.createComponent(MainHeaderComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
