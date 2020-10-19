import { ComponentFixture, TestBed } from '@angular/core/testing'

import { By } from '@angular/platform-browser'

import { TranslateModule } from '@ngx-translate/core'

import { SwitchComponent } from './switch.component'

describe('SwitchComponent', (): void => {
  let component: SwitchComponent
  let fixture: ComponentFixture<SwitchComponent>

  beforeEach((): void => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [SwitchComponent],
    })

    fixture = TestBed.createComponent(SwitchComponent)
    component = fixture.componentInstance
    component.switchOn = true
    component.textOn = 'On'
    component.textOff = 'Off'

    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })

  it('should contain text', () => {
    const text = fixture.debugElement.query(By.css('.switch__text'))
      .nativeElement

    expect(text).toBeTruthy()
  })

  it('should emit on change Switch', () => {
    let type = null
    component.changeSwitch.subscribe((message) => (type = message))
    fixture.detectChanges()

    const slider = fixture.debugElement.query(By.css('.switch__slider'))
      .nativeElement
    slider.dispatchEvent(new Event('click'))
    fixture.detectChanges()
  })
})
