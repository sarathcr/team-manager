import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TranslateModule } from '@ngx-translate/core'

import { ButtonComponent } from 'src/app/common-shared/components/button/button.component'
import { SecondaryViewComponent } from './secondary-view.component'

import { CheckCount } from '../../pipes/check-count.pipe'

describe('SecondaryViewComponent', () => {
  let component: SecondaryViewComponent
  let fixture: ComponentFixture<SecondaryViewComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecondaryViewComponent, CheckCount, ButtonComponent],
      imports: [TranslateModule.forRoot()],
    })

    fixture = TestBed.createComponent(SecondaryViewComponent)
    component = fixture.componentInstance

    component.labels = {
      selectedItemText: '',
      emptyTitle: '',
      emptyButtonText: '',
      emptyDescription: '',
    }
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
