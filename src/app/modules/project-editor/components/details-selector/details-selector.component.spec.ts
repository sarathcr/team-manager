import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BsModalService, BsModalRef, ModalModule } from 'ngx-bootstrap/modal'
import { TranslateModule } from '@ngx-translate/core'

import { DetailsSelectorComponent } from './details-selector.component'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'

describe('DetailsSelectorComponent', (): void => {
  let component: DetailsSelectorComponent
  let fixture: ComponentFixture<DetailsSelectorComponent>

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [ DetailsSelectorComponent, ButtonComponent ],
      providers: [ BsModalService, BsModalRef ],
      imports: [ ModalModule.forRoot(), TranslateModule.forRoot() ]
    })

    fixture = TestBed.createComponent(DetailsSelectorComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
