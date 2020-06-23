import { ComponentFixture, TestBed } from '@angular/core/testing'

import { InfoToolTipComponent } from './info-tooltip.component'

describe('InfoToolTipComponent', () => {
  let component: InfoToolTipComponent
  let fixture: ComponentFixture<InfoToolTipComponent>
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoToolTipComponent ]
    })

    fixture = TestBed.createComponent(InfoToolTipComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
