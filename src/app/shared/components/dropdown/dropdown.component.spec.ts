import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'

import { DropdownComponent } from './dropdown.component'

describe('DropdownComponent', () => {
  let component: DropdownComponent
  let fixture: ComponentFixture<DropdownComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownComponent ],
      imports: [ NgMultiSelectDropDownModule ]
    })

    fixture = TestBed.createComponent(DropdownComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
