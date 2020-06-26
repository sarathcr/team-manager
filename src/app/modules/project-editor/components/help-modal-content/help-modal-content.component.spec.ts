import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BsModalService, BsModalRef, ModalModule } from 'ngx-bootstrap/modal'

import { HelpModalContentComponent } from './help-modal-content.component'

describe('HelpModalContentComponent', () => {
  let component: HelpModalContentComponent
  let fixture: ComponentFixture<HelpModalContentComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpModalContentComponent ],
      providers: [ BsModalService, BsModalRef ],
      imports: [ ModalModule.forRoot() ]
    })

    fixture = TestBed.createComponent(HelpModalContentComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
