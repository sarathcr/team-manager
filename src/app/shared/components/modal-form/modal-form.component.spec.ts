import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TranslateModule } from '@ngx-translate/core'

import { ModalFormComponent } from './modal-form.component'
import { InputComponent } from 'src/app/shared/components/input/input.component'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { ValidatorComponent } from 'src/app/shared/components/validator/validator.component'

describe('ModalFormComponent', () => {
  let component: ModalFormComponent
  let fixture: ComponentFixture<ModalFormComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFormComponent, InputComponent, ButtonComponent, ValidatorComponent ],
      imports: [ TranslateModule.forRoot() ]
    })
    .compileComponents()
    fixture = TestBed.createComponent(ModalFormComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
