import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'

import { BsModalRef } from 'ngx-bootstrap/modal'
import { TranslateModule } from '@ngx-translate/core'

import { CompetencyModalContentComponent } from './competency-modal-content.component'
import { TableRowComponent } from '../table-row/table-row.component'
import { NgScrollbar } from 'ngx-scrollbar'
import { DropdownComponent } from 'src/app/shared/components/dropdown/dropdown.component'

describe('CompetencyModalContentComponent', () => {
  let component: CompetencyModalContentComponent
  let fixture: ComponentFixture<CompetencyModalContentComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetencyModalContentComponent, TableRowComponent, NgScrollbar, DropdownComponent ],
      providers: [ BsModalRef ],
      imports: [ TranslateModule.forRoot(), FormsModule ]
    })

    fixture = TestBed.createComponent(CompetencyModalContentComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
