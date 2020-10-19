import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TranslateModule } from '@ngx-translate/core'
import { TabsModule } from 'ngx-bootstrap/tabs'

import { ContextualHelpComponent } from './contextual-help.component'

import { EditorService } from '../../../../services/editor/editor.service'
import { HelpEntityService } from '../../store/entity/help/help-entity.service'

class EditorServiceStub {
  getProject(): void {}
  clearData(): void {}
  createSteps(): void {}
  getStepData(): void {}
  getStepStatus(): void {}
}

class HelpEntityServiceStub {}

describe('ContextualHelpComponent', (): void => {
  let component: ContextualHelpComponent
  let fixture: ComponentFixture<ContextualHelpComponent>

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [ContextualHelpComponent],
      providers: [
        { provide: EditorService, useClass: EditorServiceStub },
        { provide: HelpEntityService, useClass: HelpEntityServiceStub },
      ],
      imports: [TranslateModule.forRoot(), TabsModule.forRoot()],
    })

    fixture = TestBed.createComponent(ContextualHelpComponent)
    component = fixture.componentInstance
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
