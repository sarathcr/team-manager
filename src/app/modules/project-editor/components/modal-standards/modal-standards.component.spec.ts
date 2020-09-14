import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'

import { TranslateModule } from '@ngx-translate/core'
import { BsModalRef } from 'ngx-bootstrap/modal'
import { BehaviorSubject, Observable } from 'rxjs'

import { SelectComponent } from 'src/app/shared/components/select/select.component'
import { ModalStandardsComponent } from './modal-standards.component'

import { EditorService } from '../../services/editor/editor.service'
import { BlockEntityService } from '../../store/entity/block/block-entity.service'

import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { CheckboxComponent } from 'src/app/shared/components/checkbox/checkbox.component'
import { CheckCount } from '../../pipes/check-count.pipe'

class BlockEntityServiceStub {}

describe('CompetencyModalContentComponent', () => {
  let component: ModalStandardsComponent
  let fixture: ComponentFixture<ModalStandardsComponent>
  let editor: EditorService

  const dummyData = { id: 1, name: 'lorem ipsum' }
  const academicYear = {
    id: 1,
    academicYear: '2010-2011',
    startDate: new Date(),
    endDate: new Date(),
  }

  const dummyProject = {
    subjects: [
      {
        ...dummyData,
        evaluationCriteria: [],
      },
    ],
    competencyObjectives: [],
    grades: [dummyData],
    academicYear,
    region: dummyData,
  }

  const getDataByStep = (): Observable<any> => {
    return new BehaviorSubject(dummyProject)
  }

  const editorSpies = (): void => {
    spyOn(editor, 'getDataByStep').and.returnValue(getDataByStep())
    spyOn(editor, 'handleSubmit')
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModalStandardsComponent,
        CheckboxComponent,
        SelectComponent,
        CheckCount,
        ButtonComponent,
      ],
      providers: [
        BsModalRef,
        { provide: BlockEntityService, useClass: BlockEntityServiceStub },
      ],
      imports: [TranslateModule.forRoot(), FormsModule],
    })

    editor = TestBed.inject(EditorService)
    fixture = TestBed.createComponent(ModalStandardsComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should unsubscribe the subscriptions on destroy', (): void => {
    const unsubscription = spyOn(component.subscriptions, 'unsubscribe')

    fixture.destroy()

    expect(unsubscription).toHaveBeenCalled()
  })
})
