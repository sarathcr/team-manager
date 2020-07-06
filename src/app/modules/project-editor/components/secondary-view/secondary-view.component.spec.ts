import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TranslateModule } from '@ngx-translate/core'

import { SecondaryViewComponent } from './secondary-view.component'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'

import { CheckCount } from '../../pipes/check-count.pipe'

describe('SecondaryViewComponent', () => {
  let component: SecondaryViewComponent
  let fixture: ComponentFixture<SecondaryViewComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondaryViewComponent, CheckCount, ButtonComponent ],
      imports: [ TranslateModule.forRoot() ]
    })

    fixture = TestBed.createComponent(SecondaryViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
