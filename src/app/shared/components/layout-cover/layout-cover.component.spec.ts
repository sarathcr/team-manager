import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { LayoutCoverComponent } from './layout-cover.component'

describe('LayoutCoverComponent', () => {
  let component: LayoutCoverComponent
  let fixture: ComponentFixture<LayoutCoverComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutCoverComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutCoverComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
