import { ComponentFixture, TestBed } from '@angular/core/testing'

import { HeaderComponent } from './header.component'

describe('HeaderComponent', (): void => {
  let component: HeaderComponent
  let fixture: ComponentFixture<HeaderComponent>
  
  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    
    fixture = TestBed.createComponent(HeaderComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
