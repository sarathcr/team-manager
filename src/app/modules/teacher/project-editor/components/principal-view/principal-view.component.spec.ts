import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'

import { TranslateModule } from '@ngx-translate/core'
import { BsModalRef } from 'ngx-bootstrap/modal'

import { SelectComponent } from 'src/app/common-shared/components/select/select.component'
import { PrincipalViewComponent } from './principal-view.component'

import { ButtonComponent } from 'src/app/common-shared/components/button/button.component'
import { CheckboxComponent } from 'src/app/common-shared/components/checkbox/checkbox.component'
import { CheckCount } from '../../pipes/check-count.pipe'
import { ContentService } from '../../services/contents/contents.service'
import { BlockEntityService } from '../../store/entity/block/block-entity.service'

class BlockEntityServiceStub {}
class ContentServiceStub {}

describe('PrincipalViewComponent', () => {
  let component: PrincipalViewComponent
  let fixture: ComponentFixture<PrincipalViewComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PrincipalViewComponent,
        CheckboxComponent,
        SelectComponent,
        CheckCount,
        ButtonComponent,
      ],
      providers: [
        BsModalRef,
        { provide: BlockEntityService, useClass: BlockEntityServiceStub },
        { provide: ContentService, useClass: ContentServiceStub },
      ],
      imports: [TranslateModule.forRoot(), FormsModule],
    })

    fixture = TestBed.createComponent(PrincipalViewComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
