import { PlatformLocation } from '@angular/common'
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'

import { BsModalRef } from 'ngx-bootstrap/modal'

import { StandardEntityService } from '../../store/entity/standard/standard-entity.service'

import { DropDownConfig } from 'src/app/shared/constants/model/form-elements.model'
import {
  Project,
  StandardsWithSkills,
  Subject,
} from '../../constants/model/project.model'

import { SubSink } from '../../../../shared/utility/subsink.utility'
import { Block } from '../../constants/model/curriculum.model'
import {
  CompetencyModal,
  PrincipalModalColData,
  SecondaryViewLabels,
} from '../../constants/model/principle-view.model'

@Component({
  selector: 'app-modal-standards',
  templateUrl: './modal-standards.component.html',
  styleUrls: ['./modal-standards.component.scss'],
})
export class ModalStandardsComponent implements OnInit, OnDestroy {
  @Input() project: Project
  @Input() competencyObjectiveSelected: number
  @Input() dropdownData: Subject[]
  @Output() modalSubmit = new EventEmitter()
  @Output() decline = new EventEmitter()

  subjectDropdownConfig: DropDownConfig
  showModalStandards = true

  subscriptions = new SubSink()

  subjects: Subject[] = []
  returnStandards: any

  secondaryViewLabels: SecondaryViewLabels
  heading: CompetencyModal = {}
  modalColumns: PrincipalModalColData = {}
  blockData: Block[] = []
  returnStandardIds: number[]
  subjectSelected: Subject

  constructor(
    public bsModalRef: BsModalRef,
    private location: PlatformLocation,
    private standardEntityService: StandardEntityService
  ) {
    this.location.onPopState(() => this.bsModalRef.hide())
  }

  ngOnInit(): void {
    this.subjects = { ...this.project.subjects }
    this.returnStandards = this.project.competencyObjectives[
      this.competencyObjectiveSelected
    ]
    this.returnStandards = {
      ...this.returnStandards,
      standards: this.returnStandards.standards.map(({ id, name }) => ({
        id,
        name,
      })),
    }
    this.returnStandardIds = this.returnStandards.standards.map(
      (standard) => standard.id
    )
    this.createFormConfig()
    this.initViewsData()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  createFormConfig(): void {
    this.subjectSelected = this.dropdownData[0]
    this.subjectDropdownConfig = {
      id: '',
      name: '',
      disabled: false,
      data: this.dropdownData,
      selectedItems: [this.subjectSelected],
      status: 'PENDING',
      canDeselect: true,
      loading: false,
      settings: {
        textField: 'name',
        singleSelection: true,
        maxHeight: 100,
      },
    }
  }

  onDecline(): void {
    this.decline.emit()
  }

  onCheck(standard: StandardsWithSkills): void {
    standard.checked = !standard.checked
  }

  onDropdownSelect(selectedData: any): void {
    this.subjectSelected = selectedData.val[0]
  }

  toggleModalStandards(): void {
    this.showModalStandards = !this.showModalStandards
  }

  handleButtonClick(): void {
    let standardsSelected = []
    for (const competency of this.blockData) {
      standardsSelected = [
        ...standardsSelected,
        ...competency.standard.filter((standard) => standard.checked),
      ]
    }
    this.modalSubmit.emit(
      standardsSelected.map(({ id, name }) => ({ id, name }))
    )
  }

  initViewsData(): void {
    this.secondaryViewLabels = {
      selectedItemText: 'STANDARDS.project_standards_standardswindow_selected',
      emptyTitle: 'STANDARDS.project_standards_standardswindow_empty_title',
      emptyDescription:
        'STANDARDS.project_standards_contentwindow_empty_description',
      emptyButtonText: 'STANDARDS.project_standards_contentwindow_empty_button',
    }

    this.heading = {
      evaluationCriteria:
        'STANDARDS.project_standards_standardswindow_criteria',
      standard: 'STANDARDS.project_standards_standardswindow_standar',
      subject: 'STANDARDS.project_standards_standardswindow_subject',
    }

    this.modalColumns = {
      colOneHead: {
        key: 'standard',
        value: 'STANDARDS.project_standards_standardswindow_standar',
        size: 'm',
      },
      colThreeHead: {
        key: 'evaluationCriteria',
        value: 'STANDARDS.project_standards_standardswindow_criteria',
        size: 'm',
      },
      colFourHead: {
        key: 'subject',
        value: 'STANDARDS.project_standards_standardswindow_combo_title',
        size: 's',
      },
    }

    const evaluationCriteriaIds = []
    for (const subject of this.project?.subjects) {
      evaluationCriteriaIds.push(
        ...subject.evaluationCriteria.map(
          (evaluationCriteria) => evaluationCriteria.id
        )
      )
    }
    this.subscriptions.sink = this.standardEntityService
      .getWithQuery(evaluationCriteriaIds.toString())
      .subscribe((standards) => {
        const standardByCriteria = {}
        for (const standard of standards) {
          const isChecked = this.returnStandardIds.indexOf(standard.id) > -1
          const sub = this.getSubjectByEvaluationCriteria(
            standard.evaluationCriteria.id
          )
          if (
            standardByCriteria[standard.evaluationCriteria.id] === undefined
          ) {
            standardByCriteria[standard.evaluationCriteria.id] = {
              id: standard.evaluationCriteria.id,
              name: standard.evaluationCriteria.name,
              contents: [],
              evaluationCriteria: [standard.evaluationCriteria],
              subjectId: sub.id,
              standard: [
                {
                  id: standard.id,
                  name: standard.name,
                  checked: isChecked,
                  colOneData: standard.name,
                  colThreeData: standard.evaluationCriteria.name,
                  colFourData: sub.name,
                },
              ],
              numeration: standard.numeration,
              virtual: true,
            }
          } else {
            standardByCriteria[standard.evaluationCriteria.id].standard.push({
              id: standard.id,
              name: standard.name,
              checked: isChecked,
              colOneData: standard.name,
              colThreeData: standard.evaluationCriteria.name,
              colFourData: sub.name,
            })
          }
        }
        for (const id of Object.keys(standardByCriteria)) {
          this.blockData.push(standardByCriteria[id])
        }
      })
  }

  getSubjectByEvaluationCriteria(criteriaId: number): Subject {
    return this.project.subjects.find((subject) => {
      return subject.evaluationCriteria.find(
        (evaluation) => evaluation.id === criteriaId
      )
    })
  }
}
