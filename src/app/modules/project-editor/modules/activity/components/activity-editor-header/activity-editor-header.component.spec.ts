import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ActivityEditorHeaderComponent } from './activity-editor-header.component'

describe('ActivityEditorHeaderComponent', () => {
  let component: ActivityEditorHeaderComponent
  let fixture: ComponentFixture<ActivityEditorHeaderComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityEditorHeaderComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityEditorHeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
