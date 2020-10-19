import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TranslateModule } from '@ngx-translate/core'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'

import { SelectComponent } from './select.component'

describe('SelectComponent', () => {
  let component: SelectComponent
  let fixture: ComponentFixture<SelectComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectComponent],
      imports: [NgMultiSelectDropDownModule, TranslateModule.forRoot()],
    })

    fixture = TestBed.createComponent(SelectComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
