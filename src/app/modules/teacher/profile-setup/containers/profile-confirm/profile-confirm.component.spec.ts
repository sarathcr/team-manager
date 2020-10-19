import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ProfileConfirmComponent } from './profile-confirm.component'

describe('ProfileCompleteComponent', () => {
  let component: ProfileConfirmComponent
  let fixture: ComponentFixture<ProfileConfirmComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileConfirmComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileConfirmComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
