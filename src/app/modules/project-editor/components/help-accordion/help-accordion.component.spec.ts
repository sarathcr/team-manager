import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BsModalService, ModalModule } from 'ngx-bootstrap/modal'
import { AccordionComponent, AccordionConfig } from 'ngx-bootstrap/accordion'

import { HelpAccordionComponent } from './help-accordion.component'

describe('HelpAccordionComponent', (): void => {
  let component: HelpAccordionComponent
  let fixture: ComponentFixture<HelpAccordionComponent>

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [ HelpAccordionComponent, AccordionComponent ],
      providers: [ BsModalService, AccordionConfig ],
      imports: [ ModalModule.forRoot() ]
    })
    fixture = TestBed.createComponent(HelpAccordionComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
