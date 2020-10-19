import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { PeopleEditorComponent } from './people-editor.component'

describe('PeopleEditorComponent', () => {
  let component: PeopleEditorComponent
  let fixture: ComponentFixture<PeopleEditorComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PeopleEditorComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleEditorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
