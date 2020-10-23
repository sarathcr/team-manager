import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ChipsetComponent } from './chipset.component'

describe('ChipsetComponent', () => {
  let component: ChipsetComponent
  let fixture: ComponentFixture<ChipsetComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChipsetComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsetComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
