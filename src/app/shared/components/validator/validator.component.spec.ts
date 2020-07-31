import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ValidatorComponent } from './validator.component'
import { TranslateModule } from '@ngx-translate/core'

describe('ValidatorComponent', () => {
  let component: ValidatorComponent
  let fixture: ComponentFixture<ValidatorComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidatorComponent ],
      imports: [TranslateModule.forRoot()]
    })
    fixture = TestBed.createComponent(ValidatorComponent)
    component = fixture.componentInstance
    component.value = ''
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
