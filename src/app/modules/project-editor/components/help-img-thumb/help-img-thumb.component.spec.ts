import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BsModalService, ModalModule } from 'ngx-bootstrap/modal'

import { HelpImgThumbComponent } from './help-img-thumb.component'

describe('HelpImgThumbComponent', (): void => {
  let component: HelpImgThumbComponent
  let fixture: ComponentFixture<HelpImgThumbComponent>
  
  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [ HelpImgThumbComponent ],
      providers: [ BsModalService ],
      imports: [ ModalModule.forRoot() ]
    })

    fixture = TestBed.createComponent(HelpImgThumbComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
