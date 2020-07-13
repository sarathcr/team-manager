import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TextareaListComponent } from './textarea-list.component'

describe('TextareaWithBulletsComponent', (): void => {
  let component: TextareaListComponent
  let fixture: ComponentFixture<TextareaListComponent>

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [ TextareaListComponent ]
    })

    fixture = TestBed.createComponent(TextareaListComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
