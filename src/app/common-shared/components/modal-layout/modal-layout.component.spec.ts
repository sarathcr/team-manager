import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { TranslateModule } from '@ngx-translate/core'

import { By } from '@angular/platform-browser'
import { ModalLayoutComponent } from './modal-layout.component'

import { ButtonComponent } from '../button/button.component'

describe('ModalLayoutComponent', () => {
  let component: ModalLayoutComponent
  let fixture: ComponentFixture<ModalLayoutComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalLayoutComponent, ButtonComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents()
    fixture = TestBed.createComponent(ModalLayoutComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have app-button component', () => {
    const buttonComponent = fixture.debugElement.query(
      By.directive(ButtonComponent)
    ).nativeElement
    expect(buttonComponent).toBeTruthy()
  })

  it('should emit on close button click', () => {
    let type = null
    component.decline.subscribe((message) => (type = message))
    fixture.detectChanges()

    const button = fixture.debugElement.queryAll(By.directive(ButtonComponent))
    button[0].nativeElement.dispatchEvent(new Event('click'))
    fixture.detectChanges()

    expect(type).toBe('close')
  })

  it('should emit on confirm button click', () => {
    let type = null
    component.confirm.subscribe((message) => (type = message))
    fixture.detectChanges()

    const button = fixture.debugElement.queryAll(By.directive(ButtonComponent))
    button[0].nativeElement.dispatchEvent(new Event('click'))
    fixture.detectChanges()

    expect(type).toBe('confirmed')
  })
})
