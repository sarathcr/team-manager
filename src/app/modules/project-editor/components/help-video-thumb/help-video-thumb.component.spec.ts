import { ComponentFixture, TestBed } from '@angular/core/testing'

import { HelpVideoThumbComponent } from './help-video-thumb.component'
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal'

describe('HelpVideoThumbComponent', (): void => {
  let component: HelpVideoThumbComponent
  let fixture: ComponentFixture<HelpVideoThumbComponent>

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [HelpVideoThumbComponent],
      providers: [ BsModalService ],
      imports: [ ModalModule.forRoot() ]
    })

    fixture = TestBed.createComponent(HelpVideoThumbComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
