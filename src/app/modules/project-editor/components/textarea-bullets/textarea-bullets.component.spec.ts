import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NgScrollbar } from 'ngx-scrollbar'

import { TextareaBulletsComponent } from './textarea-bullets.component'

describe('TextareaWithBulletsComponent', (): void => {
  let component: TextareaBulletsComponent
  let fixture: ComponentFixture<TextareaBulletsComponent>

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [ TextareaBulletsComponent, NgScrollbar ]
    })

    fixture = TestBed.createComponent(TextareaBulletsComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
