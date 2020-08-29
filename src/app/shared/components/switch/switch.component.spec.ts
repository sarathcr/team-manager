import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SwitchComponent } from './switch.component'

describe('SwitchComponent', (): void => {
  let component: SwitchComponent
  let fixture: ComponentFixture<SwitchComponent>

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [SwitchComponent],
    })

    fixture = TestBed.createComponent(SwitchComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
