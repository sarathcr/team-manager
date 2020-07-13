import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TextareaComponent } from './textarea.component'

describe('TextareaComponent', (): void => {
  let component: TextareaComponent
  let fixture: ComponentFixture<TextareaComponent>

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [ TextareaComponent ]
    })

    fixture = TestBed.createComponent(TextareaComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
