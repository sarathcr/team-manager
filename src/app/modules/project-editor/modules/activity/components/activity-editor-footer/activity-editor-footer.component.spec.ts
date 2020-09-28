import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'

import { ActivityEditorFooterComponent } from './activity-editor-footer.component'

describe('ActivityEditorFooterComponent', () => {
  let component: ActivityEditorFooterComponent
  let fixture: ComponentFixture<ActivityEditorFooterComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityEditorFooterComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityEditorFooterComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
