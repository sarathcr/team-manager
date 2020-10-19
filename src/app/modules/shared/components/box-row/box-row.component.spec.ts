import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { BoxRowComponent } from './box-row.component'

describe('BoxRowComponent', () => {
  let component: BoxRowComponent
  let fixture: ComponentFixture<BoxRowComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoxRowComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxRowComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
