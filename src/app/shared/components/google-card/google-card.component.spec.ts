import { ComponentFixture, TestBed } from '@angular/core/testing'

import { By } from '@angular/platform-browser'

import { TranslateModule } from '@ngx-translate/core'

import { GoogleCardComponent } from './google-card.component'

describe('GoogleCardComponent', (): void => {
  let component: GoogleCardComponent
  let fixture: ComponentFixture<GoogleCardComponent>

  beforeEach((): void => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [GoogleCardComponent],
    })

    fixture = TestBed.createComponent(GoogleCardComponent)
    component = fixture.componentInstance
    component.title = 'Lorem ipsum'
    component.subtitle = 'Dolor sic senet'
    component.variant = 'doc'

    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })

  it('should contain title', () => {
    const title = fixture.debugElement.query(By.css('.card-body__title'))
      .nativeElement

    expect(title).toBeTruthy()
  })

  it('should contain subtitle', () => {
    const subtitle = fixture.debugElement.query(By.css('.card-body__subtitle'))
      .nativeElement

    expect(subtitle).toBeTruthy()
  })

  it('should contain footer text', () => {
    const footerText = fixture.debugElement.query(By.css('.card-footer__text'))
      .nativeElement

    expect(footerText).toBeTruthy()
  })

  it('should emit on card footer click', () => {
    let type = null
    component.openModal.subscribe((message) => (type = message))
    fixture.detectChanges()

    const slider = fixture.debugElement.query(By.css('.card-footer'))
      .nativeElement
    slider.dispatchEvent(new Event('click'))
    fixture.detectChanges()
  })
})
