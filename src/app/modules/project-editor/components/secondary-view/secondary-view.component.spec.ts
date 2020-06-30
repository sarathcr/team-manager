import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SecondaryViewComponent } from './secondary-view.component'

describe('SecondaryViewComponent', () => {
  let component: SecondaryViewComponent
  let fixture: ComponentFixture<SecondaryViewComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondaryViewComponent ]
    })

    fixture = TestBed.createComponent(SecondaryViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
