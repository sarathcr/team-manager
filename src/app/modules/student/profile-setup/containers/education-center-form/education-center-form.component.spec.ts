import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { EducationCenterFormComponent } from './education-center-form.component'

describe('EducationCenterFormComponent', () => {
  let component: EducationCenterFormComponent
  let fixture: ComponentFixture<EducationCenterFormComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EducationCenterFormComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationCenterFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
