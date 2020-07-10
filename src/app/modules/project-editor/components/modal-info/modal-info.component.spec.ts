import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal'
import { TranslateModule } from '@ngx-translate/core'

import { ModalInfoComponent } from './modal-info.component'
import { ButtonComponent } from '../../../../shared/components/button/button.component'


describe('ModalInfoComponent', (): void => {
  let component: ModalInfoComponent
  let fixture: ComponentFixture<ModalInfoComponent>

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [ ModalInfoComponent, ButtonComponent ],
      providers: [ BsModalRef ],
      imports: [ ModalModule.forRoot(), TranslateModule.forRoot() ]
    })

    fixture = TestBed.createComponent(ModalInfoComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
