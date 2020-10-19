import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TranslateModule } from '@ngx-translate/core'

import { By } from '@angular/platform-browser'

import { HeaderComponent } from './header.component'

import { ButtonComponent } from '../../../../common-shared/components/button/button.component'

describe('HeaderComponent', () => {
  let component: HeaderComponent
  let fixture: ComponentFixture<HeaderComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, ButtonComponent],
      imports: [TranslateModule.forRoot()],
    })
    fixture = TestBed.createComponent(HeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have a title', () => {
    const title = fixture.debugElement.query(By.css('.header__file'))
    expect(title).toBeTruthy()
  })

  it('should have page count', () => {
    const title = fixture.debugElement.query(By.css('.header__page-current'))
    expect(title).toBeTruthy()
  })

  it('should emit zoom type on zoom in button click', () => {
    let type = null
    component.setZoom.subscribe((zoomType) => (type = zoomType))
    fixture.detectChanges()

    const button = fixture.debugElement.queryAll(By.directive(ButtonComponent))
    button[0].nativeElement.dispatchEvent(new Event('click'))
    fixture.detectChanges()

    expect(type).toBe('increment')
  })

  it('should emit zoom type on zoom out button click', () => {
    let type = null
    component.setZoom.subscribe((zoomType) => (type = zoomType))
    fixture.detectChanges()

    const button = fixture.debugElement.queryAll(By.directive(ButtonComponent))
    button[1].nativeElement.dispatchEvent(new Event('click'))
    fixture.detectChanges()

    expect(type).toBe('decrement')
  })

  it('should emit download event', () => {
    spyOn(component.download, 'emit')

    fixture.detectChanges()
    const button = fixture.debugElement.queryAll(By.directive(ButtonComponent))
    button[2].nativeElement.dispatchEvent(new Event('click'))
    fixture.detectChanges()

    expect(component.download.emit).toHaveBeenCalled()
  })

  it('should emit print event', () => {
    spyOn(component.print, 'emit')

    fixture.detectChanges()
    const button = fixture.debugElement.queryAll(By.directive(ButtonComponent))
    button[3].nativeElement.dispatchEvent(new Event('click'))
    fixture.detectChanges()

    expect(component.print.emit).toHaveBeenCalled()
  })
})
