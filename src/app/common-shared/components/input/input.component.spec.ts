import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'

import { ValidatorComponent } from '../validator/validator.component'
import { InputComponent } from './input.component'

describe('InputComponent', () => {
  let component: InputComponent
  let fixture: ComponentFixture<InputComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputComponent, ValidatorComponent],
      imports: [TranslateModule.forRoot(), FormsModule],
    })

    fixture = TestBed.createComponent(InputComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
