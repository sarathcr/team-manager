import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TranslateModule } from '@ngx-translate/core'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'

import { DropdownComponent } from './dropdown.component'

describe('DropdownComponent', () => {
  let component: DropdownComponent
  let fixture: ComponentFixture<DropdownComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownComponent],
      imports: [NgMultiSelectDropDownModule, TranslateModule.forRoot()],
    })

    fixture = TestBed.createComponent(DropdownComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
