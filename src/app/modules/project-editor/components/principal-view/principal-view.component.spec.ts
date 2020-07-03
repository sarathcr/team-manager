import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'

import { BsModalRef } from 'ngx-bootstrap/modal'
import { TranslateModule } from '@ngx-translate/core'

import { PrincipalViewComponent } from './principal-view.component'
import { CheckBoxComponent } from '../checkbox/checkbox.component'
import { DropdownComponent } from 'src/app/shared/components/dropdown/dropdown.component'

describe('CompetencyModalContentComponent', () => {
  let component: PrincipalViewComponent
  let fixture: ComponentFixture<PrincipalViewComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipalViewComponent, CheckBoxComponent, DropdownComponent ],
      providers: [ BsModalRef ],
      imports: [ TranslateModule.forRoot(), FormsModule ]
    })

    fixture = TestBed.createComponent(PrincipalViewComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
