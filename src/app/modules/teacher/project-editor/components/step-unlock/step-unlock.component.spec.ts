import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { TranslateModule } from '@ngx-translate/core'

import { ButtonComponent } from 'src/app/common-shared/components/button/button.component'
import { StepUnlockComponent } from './step-unlock.component'

describe('StepUnlockComponent', (): void => {
  let component: StepUnlockComponent
  let fixture: ComponentFixture<StepUnlockComponent>

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [StepUnlockComponent, ButtonComponent],
      imports: [TranslateModule.forRoot(), RouterTestingModule],
    })

    fixture = TestBed.createComponent(StepUnlockComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
