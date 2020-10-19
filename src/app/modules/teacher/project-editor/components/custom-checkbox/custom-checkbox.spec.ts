import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { CustomCheckBoxComponent } from './custom-checkbox.component'

describe('TableRowComponent', () => {
  let component: CustomCheckBoxComponent
  let fixture: ComponentFixture<CustomCheckBoxComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomCheckBoxComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCheckBoxComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
