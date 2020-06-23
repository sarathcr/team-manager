import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal'
import { TranslateModule } from '@ngx-translate/core'

import { ModalComponent } from './modal.component'
import { ButtonComponent } from '../../../../shared/components/button/button.component'


describe('ModalComponent', (): void => {
  let component: ModalComponent
  let fixture: ComponentFixture<ModalComponent>

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [ ModalComponent, ButtonComponent ],
      providers: [ BsModalRef ],
      imports: [ ModalModule.forRoot(), TranslateModule.forRoot() ]
    })

    fixture = TestBed.createComponent(ModalComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
