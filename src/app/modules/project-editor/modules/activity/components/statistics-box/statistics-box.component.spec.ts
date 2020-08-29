import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { StatisticsBoxComponent } from './statistics-box.component'

describe('StatisticsBoxComponent', () => {
  let component: StatisticsBoxComponent
  let fixture: ComponentFixture<StatisticsBoxComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticsBoxComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsBoxComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
