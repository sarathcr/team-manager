import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'

import { BsModalRef } from 'ngx-bootstrap/modal'
import { TranslateModule } from '@ngx-translate/core'

import { PrincipalViewComponent } from './principal-view.component'
import { DropdownComponent } from 'src/app/shared/components/dropdown/dropdown.component'
import { CheckBoxComponent } from 'src/app/shared/components/checkbox/checkbox.component'

import { BlockEntityService } from '../../store/entity/block/block-entity.service'
import { CheckCount } from '../../pipes/check-count.pipe'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'

class BlockEntityServiceStub { }

describe('CompetencyModalContentComponent', () => {
  let component: PrincipalViewComponent
  let fixture: ComponentFixture<PrincipalViewComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipalViewComponent, CheckBoxComponent, DropdownComponent, CheckCount, ButtonComponent  ],
      providers: [ BsModalRef, { provide: BlockEntityService, useClass: BlockEntityServiceStub } ],
      imports: [ TranslateModule.forRoot(), FormsModule ]
    })

    fixture = TestBed.createComponent(PrincipalViewComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
