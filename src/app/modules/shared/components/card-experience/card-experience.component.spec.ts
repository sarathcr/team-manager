import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TranslateModule } from '@ngx-translate/core'

import { By } from '@angular/platform-browser'
import { CardExperienceComponent } from './card-experience.component'

const projectData = {
  id: 1,
  title: 'Lorem Ipsum',
  creativeImage:
    'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search-v2_297x176.jpg',
}

describe('CardExperienceComponent', (): void => {
  let component: CardExperienceComponent
  let fixture: ComponentFixture<CardExperienceComponent>

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [CardExperienceComponent],
      imports: [TranslateModule.forRoot()],
    })

    fixture = TestBed.createComponent(CardExperienceComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
  it('should have all image, title, status, icons', () => {
    component.data = projectData
    fixture.detectChanges()
    const image = fixture.debugElement.query(By.css('.card-experience__image'))
    const title = fixture.debugElement.query(
      By.css('.card-experience__title-section')
    )
    const status = fixture.debugElement.query(
      By.css('.card-experience__status')
    )
    const subjectIcons = fixture.debugElement.query(
      By.css('.card-experience__icon')
    )

    expect(image).toBeTruthy()
    expect(title).toBeTruthy()
    expect(status).toBeTruthy()
    expect(subjectIcons).toBeTruthy()
  })

  it('should show notification', () => {
    component.data = projectData
    component.notification = true

    fixture.detectChanges()
    const notification = fixture.debugElement.query(
      By.css('.card-experience__notification')
    )

    expect(notification).toBeTruthy()
  })
})
