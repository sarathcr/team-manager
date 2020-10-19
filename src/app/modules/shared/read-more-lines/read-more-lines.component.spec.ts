import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ReadMoreLinesComponent } from './read-more-lines.component'

describe('ReadMoreLinesComponent', () => {
  let component: ReadMoreLinesComponent
  let fixture: ComponentFixture<ReadMoreLinesComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReadMoreLinesComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadMoreLinesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
