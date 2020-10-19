import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TranslateModule } from '@ngx-translate/core'

import { ButtonComponent } from 'src/app/common-shared/components/button/button.component'
import { InputComponent } from 'src/app/common-shared/components/input/input.component'
import { ValidatorComponent } from 'src/app/common-shared/components/validator/validator.component'
import { ModalFormComponent } from './modal-form.component'

describe('ModalFormComponent', () => {
  let component: ModalFormComponent
  let fixture: ComponentFixture<ModalFormComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModalFormComponent,
        InputComponent,
        ButtonComponent,
        ValidatorComponent,
      ],
      imports: [TranslateModule.forRoot()],
    }).compileComponents()
    fixture = TestBed.createComponent(ModalFormComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
