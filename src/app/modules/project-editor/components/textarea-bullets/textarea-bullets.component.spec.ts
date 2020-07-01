import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TextareaBulletsComponent } from './textarea-bullets.component'

describe('TextareaWithBulletsComponent', (): void => {
  let component: TextareaBulletsComponent
  let fixture: ComponentFixture<TextareaBulletsComponent>

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [ TextareaBulletsComponent ]
    })

    fixture = TestBed.createComponent(TextareaBulletsComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
