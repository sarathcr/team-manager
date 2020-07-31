import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'

import { BsModalRef } from 'ngx-bootstrap/modal'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, Observable } from 'rxjs'

import { ModalStandardsComponent } from './modal-standards.component'
import { DropdownComponent } from 'src/app/shared/components/dropdown/dropdown.component'
import { CheckBoxComponent } from 'src/app/shared/components/checkbox/checkbox.component'

import { BlockEntityService } from '../../store/entity/block/block-entity.service'
import { EditorService } from '../../services/editor/editor.service'

import { CheckCount } from '../../pipes/check-count.pipe'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'

class BlockEntityServiceStub { }

describe('CompetencyModalContentComponent', () => {
  let component: ModalStandardsComponent
  let fixture: ComponentFixture<ModalStandardsComponent>
  let editor: EditorService

  const dummyData = { id: 1, name: 'lorem ipsum'}
  const academicYear = { id: 1, academicYear: '2010-2011', startDate: new Date(), endDate: new Date() }

  const dummyProject = {
    subjects: [{
      ...dummyData,
      evaluationCriteria: []
    }],
    competencyObjectives: [],
    grades: [dummyData],
    academicYear,
    region: dummyData
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
      declarations: [ ModalStandardsComponent, CheckBoxComponent, DropdownComponent, CheckCount, ButtonComponent  ],
      providers: [ BsModalRef, { provide: BlockEntityService, useClass: BlockEntityServiceStub } ],
      imports: [ TranslateModule.forRoot(), FormsModule ]
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
