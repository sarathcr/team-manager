import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { ExercisesCardComponent } from './exercises-card.component'

describe('ExercisesCardComponent', () => {
  let component: ExercisesCardComponent
  let fixture: ComponentFixture<ExercisesCardComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExercisesCardComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisesCardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should contail title and should be a string', () => {
    component.title = 'title'
    expect(component.title).not.toBeNull()
    expect(component.title).toBeTruthy()
  })

  it('should contail subtitle and should be a string', () => {
    component.subtitle = 'subtitle'
    expect(component.subtitle).not.toBeNull()
    expect(component.subtitle).toBeTruthy()
  })

  it('should contail subtitleKey and should be a string', () => {
    component.subtitleKey = 'subtitleKey'
    expect(component.subtitleKey).not.toBeNull()
    expect(component.subtitleKey).toBeTruthy()
  })

  it('should contail subtitleValue and should be a string', () => {
    component.subtitleValue = 'subtitleValue'
    expect(component.subtitleValue).not.toBeNull()
    expect(component.subtitleValue).toBeTruthy()
  })

  it('should contail description and should be a string', () => {
    component.description = 'description'
    expect(component.description).not.toBeNull()
    expect(component.description).toBeTruthy()
  })

  it('should contail material label and should be a string', () => {
    component.texts.label = 'material label'
    expect(component.texts.label).not.toBeNull()
    expect(component.texts.label).toBeTruthy()
  })

  it('should contail material title and should be a string', () => {
    component.texts.title = 'material title'
    expect(component.texts.title).not.toBeNull()
    expect(component.texts.title).toBeTruthy()
  })

  it('should emit', () => {
    spyOn(component.options, 'emit')
    component.onClick()
    expect(component.options.emit).toHaveBeenCalled()
  })
})
