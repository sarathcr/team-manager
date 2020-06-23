import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LanguageSelectorComponent } from './language-selector.component'
import { TranslateModule } from '@ngx-translate/core'

describe('LanguageSelectorComponent', (): void => {
  let component: LanguageSelectorComponent
  let fixture: ComponentFixture<LanguageSelectorComponent>

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [ LanguageSelectorComponent ],
      imports: [ TranslateModule.forRoot() ]
    })

    fixture = TestBed.createComponent(LanguageSelectorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
