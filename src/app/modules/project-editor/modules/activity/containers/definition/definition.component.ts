import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import {
  Activity,
  ActivityResource,
  ActivityState,
} from 'src/app/modules/project-editor/constants/model/activity.model'
import {
  Project,
  Standard,
  Subject,
} from 'src/app/modules/project-editor/constants/model/project.model'
import { DefinitionDropdownData } from 'src/app/modules/project-editor/modules/activity/constants/data/form-elements.data'
import { EditorService } from 'src/app/modules/project-editor/services/editor/editor.service'
import { StudentGroupsEntityService } from 'src/app/modules/project-editor/store/entity/student-groups/student-groups-entity.service'
import { TeachingStrategyEntityService } from 'src/app/modules/project-editor/store/entity/teaching-strategy/teaching-strategy-entity.service'
import { DropdownConfigInit } from 'src/app/shared/constants/data/form-elements.data'
import { FieldEvent } from 'src/app/shared/constants/model/form-elements.model'
import { SubSink } from 'src/app/shared/utility/subsink.utility'
import {
  CustomStudentGroup,
  CustomTeachingStrategy,
  Item,
  Objectives,
  StudentGroup,
  TeachingStrategy,
} from '../../constants/model/form-elements.model'

@Component({
  selector: 'app-definition',
  templateUrl: './definition.component.html',
  styleUrls: ['./definition.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DefinitionComponent implements OnInit, OnDestroy {
  activity: Activity
  project: Project
  subscriptions = new SubSink()
  loading = false

  phaseDropdown = new DropdownConfigInit('phase')
  signatureDropdown = new DropdownConfigInit('signature', 'multiselect')
  modalityDropdown = new DropdownConfigInit('modality')
  definitionDropdownData = new DefinitionDropdownData()
  fieldNames = ['phaseDropdown', 'signatureDropdown', 'modalityDropdown']

  isFormUpdated = false
  isValid = false
  isValidForm: boolean
  buttonDisabled = true
  buttonSubmitted = false
  state: ActivityState = 'TO_DEFINE'
  modalButtonStatus = true

  phasesData: string
  duration: number
  minuteError = false
  subjects: Subject[]
  modalityData: string
  description: string

  teachingStrategies: TeachingStrategy[] = []
  customTeachingStrategies: CustomTeachingStrategy[] = []
  selectedTeachings = []
  compareTeachings = []
  customTeachingStrategy: string

  studentGroups: StudentGroup[] = []
  customStudentGroups: CustomStudentGroup[] = []
  selectedStudentGroups = []
  compareStudentGroups = []
  customStudentGroup: string

  learningObjectives: Objectives[] = []
  selectedObjectives = []
  compareObjectives = []

  learningStandards: Standard[] = []
  selectedStandards = []
  compareStandards = []

  learningSubjects: Subject[] = []
  selectedContents = []
  compareSubjects = []

  resources: ActivityResource[]
  diversity: string

  modalRef: BsModalRef

  formData: Activity

  deleteItem: Item
  deleteModalTitle: string
  deleteModalMessage: string

  @Output() validateCheck: EventEmitter<any> = new EventEmitter()
  @ViewChild('modalDelete') modalDelete: TemplateRef<any>

  constructor(
    private editor: EditorService,
    private modalService: BsModalService,
    private teachingStrategyService: TeachingStrategyEntityService,
    private studentGroupsService: StudentGroupsEntityService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.defInit()
  }

  ngOnDestroy(): void {
    if (this.isFormUpdated) {
      this.saveForm('TO_DEFINE')
    }
    this.subscriptions.unsubscribe()
  }

  defInit(): void {
    this.project = this.editor.project
    this.getSubjects()
    this.phaseDropdown.disabled = false
    this.signatureDropdown.disabled = false
    this.modalityDropdown.disabled = false
    this.phaseDropdown.data = this.definitionDropdownData.phasesData
    this.subscriptions.sink = this.translateService
      .stream(this.definitionDropdownData.phasesData.map((data) => data.name))
      .subscribe((translations) => {
        const trArray = [...Object.values(translations)]
        this.phaseDropdown.data.forEach(
          (data, index) => (data.name = trArray[index])
        )
      })
    this.modalityDropdown.data = this.definitionDropdownData.modalityData
    this.subscriptions.sink = this.translateService
      .stream(this.definitionDropdownData.modalityData.map((data) => data.name))
      .subscribe((translations) => {
        const trArray = [...Object.values(translations)]
        this.modalityDropdown.data.forEach(
          (data, index) => (data.name = trArray[index])
        )
      })
    this.getDefinition()
  }

  // Subscribing and assigning all activity data from project
  getDefinition(): void {
    this.subscriptions.sink = this.editor.activity$.subscribe((activity) => {
      this.activity = { ...activity }
      this.formData = { ...activity }
      if (this.activity.phase) {
        const phase = this.definitionDropdownData.phasesData.find(
          (data) => data.id === this.activity.phase
        )
        this.phaseDropdown.selectedItems = [
          {
            id: this.activity.phase,
            name: phase.name,
          },
        ]
        this.phasesData = this.activity.phase
        this.phaseDropdown.status = 'INPROCESS'
      }
      if (this.activity.subjects) {
        this.signatureDropdown.selectedItems = this.activity.subjects
        this.subjects = this.activity.subjects
        this.signatureDropdown.status = 'INPROCESS'
      }
      if (this.activity.modality) {
        const modality = this.definitionDropdownData.modalityData.find(
          (data) => data.id === this.activity.modality
        )
        this.modalityDropdown.selectedItems = [
          {
            id: this.activity.modality,
            name: modality.name,
          },
        ]
        this.modalityData = this.activity.modality
        this.signatureDropdown.status = 'INPROCESS'
      }
      this.duration = this.activity.duration
      this.description = this.activity.description
      this.diversity = this.activity.diversity
      this.selectedContents = this.activity.contents
        ? this.deepCopyArray([...this.activity.contents])
        : []
      this.resources = this.activity.resources
        ? this.deepCopyArray([...this.activity.resources])
        : []
      this.selectedStandards = this.activity.standards
        ? this.deepCopyArray([...this.activity.standards])
        : []

      this.selectedTeachings = this.concatArrays(
        this.activity.teachingStrategies,
        this.activity.customTeachingStrategies
      )
      this.selectedStudentGroups = this.concatArrays(
        this.activity.studentGroups,
        this.activity.customStudentGroups
      )
      if (this.activity?.objectives) {
        this.selectedObjectives = this.activity.objectives
          ? this.deepCopyArray(this.activity.objectives)
          : []
      }
      if (this.activity?.contents) {
        this.selectedContents = this.deepCopyArray(this.activity.contents)
      }
      this.activity.state = this.activity.state
        ? this.activity.state
        : 'TO_DEFINE'
      this.validationCheck()

      this.getTeachingStrategies()
      this.getStudentGroups()
      this.getAllObjectives()
      this.getAllContents()
      this.getAllStandards()
      this.validationCheck()
    })
  }

  // Get subjects for signature dropdown
  getSubjects(): void {
    this.signatureDropdown.data = this.editor.project.subjects
  }

  getTeachingStrategies(): void {
    this.compareTeachings = []
    this.subscriptions.sink = this.teachingStrategyService.entities$.subscribe(
      (data) => {
        this.teachingStrategies = data.map((item) => {
          const newObject = Object.assign({}, item)
          newObject.checked = false
          this.selectedTeachings.forEach((selectedItem) => {
            if (selectedItem.id === item.id) {
              newObject.checked = true
            }
          })
          return newObject
        })
        this.compareTeachings = this.deepCopyArray(this.teachingStrategies)
        if (!data.length) {
          this.teachingStrategyService.getAll()
        }
      }
    )
  }

  getStudentGroups(): void {
    this.compareStudentGroups = []
    this.subscriptions.sink = this.studentGroupsService.entities$.subscribe(
      (data) => {
        this.studentGroups = data.map((item) => {
          const newObject = Object.assign({}, item)
          newObject.checked = false
          this.selectedStudentGroups.forEach((selectedItem) => {
            if (selectedItem.id === item.id) {
              newObject.checked = true
            }
          })
          return newObject
        })
        this.compareStudentGroups = this.deepCopyArray(this.studentGroups)
        if (!data.length) {
          this.studentGroupsService.getAll()
        }
      }
    )
  }

  getAllObjectives(): void {
    this.compareObjectives = []
    this.learningObjectives = this.project.competencyObjectives.map((item) => {
      const newObject = Object.assign({}, item)
      newObject.checked = false
      this.selectedObjectives.forEach((selectedItem) => {
        if (selectedItem.id === item.id) {
          newObject.checked = true
        }
      })
      return newObject
    })
    this.compareObjectives = this.deepCopyArray(this.learningObjectives)
  }

  getAllContents(): void {
    this.compareSubjects = []
    this.learningSubjects = this.project.subjects.map(
      ({ id, name, contents, customContents }) => ({
        id,
        name,
        contents,
        customContents,
      })
    )
    const selectedContents = this.selectedContents.map(({ id }) => id)
    this.learningSubjects = this.learningSubjects.map((subject) => {
      for (const content of subject.contents) {
        content.checked = false
        if (selectedContents.includes(content.id)) {
          content.checked = true
        }
      }
      return subject
    })
    this.compareSubjects = this.deepCopyArray(this.learningSubjects)
  }

  getAllStandards(): void {
    this.compareObjectives = []
    this.learningObjectives = this.project.competencyObjectives.map(
      ({ id, name, standards }) => ({
        id,
        name,
        standards,
      })
    )
    const selectedStandards = this.selectedStandards.map(({ id }) => id)
    this.learningObjectives = this.learningObjectives.map((objective) => {
      for (const standard of objective.standards) {
        standard.checked = false
        if (selectedStandards.includes(standard.id)) {
          standard.checked = true
        }
      }
      return objective
    })
    this.compareObjectives = this.deepCopyArray(this.learningObjectives)
  }

  // Funtion updates the edited list
  editResource(resources: ActivityResource[]): void {
    this.formData.resources = resources
    this.validationCheck()
    this.saveForm('TO_DEFINE')
  }

  // Function updates the deleted list
  deleteResource(resources: ActivityResource[]): void {
    this.formData.resources = resources
    this.validationCheck()
    this.isFormUpdated = true
  }

  addResource(resources: ActivityResource[]): void {
    this.formData.resources = resources
    this.validationCheck()
    this.saveForm('TO_DEFINE')
  }

  openModal(data: object): void {
    this.modalRef = this.modalService.show(this.modalDelete, {
      class: 'common-modal  modal-dialog-centered',
    })
  }

  declineModal(event: any, property: string = 'default'): void {
    this.modalButtonStatus = true
    this.modalRef.hide()
    switch (property) {
      case 'teaching':
        this.teachingStrategies = this.deepCopyArray(this.compareTeachings)
        break
      case 'student-groups':
        this.studentGroups = this.deepCopyArray(this.compareStudentGroups)
        break
      case 'objectives':
        this.learningObjectives = this.deepCopyArray(this.compareObjectives)
        break
      case 'contents':
        this.learningSubjects = this.deepCopyArray(this.compareSubjects)
        break
      case 'standards':
        this.learningObjectives = this.deepCopyArray(this.compareObjectives)
        break
    }
  }

  onValueChange(data: any, type: string): void {
    switch (type) {
      case 'teachingstrategy':
        this.customTeachingStrategy = data
        this.modalButtonStatus = !data.length ? true : false
        break
      case 'studentgroup':
        this.customStudentGroup = data
        this.modalButtonStatus = !data.length ? true : false
        break
      case 'duration':
        this.onMinuteChange(data)
        break
    }
    this.activity.state = 'TO_DEFINE'
    this.isFormUpdated = true
  }

  // Duration field validation
  onMinuteChange(value: any): void {
    if (isNaN(Number(value))) {
      this.minuteError = true
    } else {
      this.minuteError = false
      this.formData.duration = value
    }
    this.validationCheck()
  }

  confirmModal(event: any): void {
    this.modalRef.hide()
  }

  // Confirm Delete Common
  confirmDelete(): void {
    switch (this.deleteItem.name) {
      case 'teaching':
        this.deleteCombinedArrayItem(
          'selectedTeachings',
          'teachingStrategies',
          'customTeachingStrategies'
        )
        break
      case 'student-groups':
        this.deleteCombinedArrayItem(
          'selectedStudentGroups',
          'studentGroups',
          'customStudentGroups'
        )
        break
      case 'objectives':
        this.deleteObjectivesArrayItem(
          'selectedObjectives',
          'learningObjectives',
          'objectives'
        )
        break
      case 'contents':
        this.deleteModalArrayItem(
          'selectedContents',
          'learningSubjects',
          'contents'
        )
        break
      case 'standards':
        this.deleteModalArrayItem(
          'selectedStandards',
          'learningObjectives',
          'standards'
        )
        break
    }
    this.modalRef.hide()
  }

  // Modal View Open Common
  openSecondaryView(data: object): void {
    this.modalRef = this.modalService.show(data, {
      ignoreBackdropClick: true,
      class: 'modal-dialog-centered modal-layout_small',
    })
    this.validationCheck()
  }

  // Modal data checkbox change event catch
  updateRowEntity(data: Item, property: string): void {
    switch (property) {
      case 'teaching':
        const teaching = this.teachingStrategies.find((item) => {
          return item.id === data.id
        })
        teaching.checked = data.checked

        this.modalButtonStatus = this.checkUpdation(
          this.compareTeachings,
          this.teachingStrategies
        )
        break
      case 'student-groups':
        const studentGroup = this.studentGroups.find((item) => {
          return item.id === data.id
        })
        studentGroup.checked = data.checked

        this.modalButtonStatus = this.checkUpdation(
          this.compareStudentGroups,
          this.studentGroups
        )
        break
      case 'objectives':
        const objectives = this.learningObjectives.find((item) => {
          return item.id === data.id
        })
        objectives.checked = data.checked
        this.modalButtonStatus = this.checkUpdation(
          this.compareObjectives,
          this.learningObjectives
        )
        break
      case 'contents':
        this.learningSubjects = this.learningSubjects.map((subject) => {
          for (const content of subject.contents) {
            if (content.id === data.id) {
              content.checked = data.checked
            }
          }
          return subject
        })
        this.modalButtonStatus = this.checkUpdation(
          this.compareSubjects,
          this.learningSubjects
        )
        break
      case 'standards':
        this.learningObjectives = this.learningObjectives.map((objective) => {
          for (const standard of objective.standards) {
            if (standard.id === data.id) {
              standard.checked = data.checked
            }
          }
          return objective
        })

        this.modalButtonStatus = this.checkUpdation(
          this.compareObjectives,
          this.learningObjectives
        )
        break
    }
  }

  // Save Secondary View Data
  saveSecondaryViewData(event: any, property: string): void {
    this.modalRef.hide()
    switch (property) {
      case 'teaching':
        this.selectedTeachings = this.teachingStrategies
          .filter((item) => item.checked)
          .map((item) => {
            return { id: item.id, name: item.name }
          })
        this.formData.customTeachingStrategies = this.activity
          .customTeachingStrategies
          ? [...this.activity.customTeachingStrategies]
          : []
        if (this.customTeachingStrategy) {
          this.formData.customTeachingStrategies.push({
            name: this.customTeachingStrategy,
          })
          this.customTeachingStrategy = null
        }
        this.compareTeachings = this.deepCopyArray(this.teachingStrategies)
        this.formData.teachingStrategies = this.selectedTeachings
        this.selectedTeachings = [
          ...this.selectedTeachings,
          ...this.formData.customTeachingStrategies,
        ]
        break
      case 'student-groups':
        this.selectedStudentGroups = this.studentGroups
          .filter((item) => item.checked)
          .map((item) => {
            return { id: item.id, name: item.name }
          })
        this.formData.customStudentGroups = this.activity.customStudentGroups
          ? [...this.activity.customStudentGroups]
          : []
        if (this.customStudentGroup) {
          this.formData.customStudentGroups.push({
            name: this.customStudentGroup,
          })
          this.customStudentGroup = null
        }
        this.compareStudentGroups = this.deepCopyArray(this.studentGroups)
        this.formData.studentGroups = this.selectedStudentGroups
        this.selectedStudentGroups = [
          ...this.selectedStudentGroups,
          ...this.formData.customStudentGroups,
        ]
        break
      case 'objectives':
        this.selectedObjectives = this.learningObjectives
          .filter((item) => item.checked)
          .map((item) => {
            return {
              id: item.id,
              name: item.name,
              customStandards: item.customStandards,
              standards: item.standards,
            }
          })
        this.compareObjectives = this.deepCopyArray(this.learningObjectives)
        this.formData.objectives = this.selectedObjectives
        break
      case 'contents':
        this.selectedContents = []
        for (const subject of this.learningSubjects) {
          for (const content of subject.contents) {
            if (content.checked) {
              this.selectedContents.push({
                id: content.id,
                name: content.name,
              })
            }
          }
        }
        this.compareSubjects = this.deepCopyArray(this.learningSubjects)
        this.formData.contents = this.selectedContents
        break
      case 'standards':
        this.selectedStandards = []
        for (const objective of this.learningObjectives) {
          for (const standard of objective.standards) {
            if (standard.checked) {
              this.selectedStandards.push({
                id: standard.id,
                name: standard.name,
              })
            }
          }
        }
        this.compareObjectives = this.deepCopyArray(this.learningObjectives)
        this.formData.standards = this.selectedStandards
        break
    }
    this.modalButtonStatus = true
    this.saveForm('TO_DEFINE')
    this.isFormUpdated = true
    this.validationCheck()
  }

  // Delete modal open
  openDeleteModal(data: Item, name: string): void {
    switch (name) {
      case 'teaching':
        this.deleteModalTitle =
          'ACTIVITY_DEFINITION.activity_delete_strategies_confirmation_title'
        this.deleteModalMessage =
          'ACTIVITY_DEFINITION.activity_delete_confirmation_message'
        break
      case 'student-groups':
        this.deleteModalTitle =
          'ACTIVITY_DEFINITION.activity_delete_groups_confirmation_title'
        this.deleteModalMessage =
          'ACTIVITY_DEFINITION.activity_delete_confirmation_message'
        break
      case 'objectives':
        this.deleteModalTitle =
          'ACTIVITY_DEFINITION.activity_delete_objectives_confirmation_title'
        this.deleteModalMessage =
          'ACTIVITY_DEFINITION.activity_delete_confirmation_message_objectives'
        break
      case 'contents':
        this.deleteModalTitle =
          'ACTIVITY_DEFINITION.activity_delete_contents_confirmation_title'
        this.deleteModalMessage =
          'ACTIVITY_DEFINITION.activity_delete_confirmation_message'
        break
      case 'standards':
        this.deleteModalTitle =
          'ACTIVITY_DEFINITION.activity_delete_standards_confirmation_title'
        this.deleteModalMessage =
          'ACTIVITY_DEFINITION.activity_delete_confirmation_message'
        break
    }
    this.deleteItem = { id: data.id, name, type: data?.type }
    this.modalRef = this.modalService.show(this.modalDelete, {
      class: 'common-modal  modal-dialog-centered',
    })
  }

  // Teaching Strategies and StudentGroup delete data
  deleteCombinedArrayItem(
    selectedArray: string,
    mainArray: string,
    customArray: string
  ): void {
    for (const [index, item] of this[selectedArray].entries()) {
      if (
        item.type === this.deleteItem.type &&
        item.id === this.deleteItem.id
      ) {
        this[selectedArray].splice(index, 1)
      }
    }
    for (const item of this[mainArray]) {
      if (
        item.id === this.deleteItem.id &&
        item.type === this.deleteItem.type
      ) {
        item.checked = false
      }
    }
    this.formData[mainArray] = this[selectedArray].filter(
      (item) => item.type === 'primary'
    )
    this.formData[customArray] = this[selectedArray].filter(
      (item) => item.type === 'secondary'
    )
    this.saveForm('TO_DEFINE')
    this.isFormUpdated = true
    this.validationCheck()
  }

  // Objectives
  deleteObjectivesArrayItem(
    selectedArray: string,
    mainArray: string,
    selector: string
  ): void {
    this[selectedArray] = this[selectedArray].filter(
      (item) => item.id !== this.deleteItem.id
    )
    const result = this[mainArray].find((item) => {
      return item.id === this.deleteItem.id
    })
    result.checked = false
    this.formData[selector] = this[selectedArray]
    this.saveForm('TO_DEFINE')
    this.isFormUpdated = true
    this.validationCheck()
  }

  // Contents/Standards delete data delete data
  deleteModalArrayItem(
    selectedArray: string,
    mainArray: string,
    selector: string
  ): void {
    this[selectedArray] = this[selectedArray].filter(
      (item) => item.id !== this.deleteItem.id
    )
    for (const item of this[mainArray]) {
      for (const content of item[selector]) {
        if (content.id === this.deleteItem.id) {
          content.checked = false
        }
      }
    }
    this.formData[selector] = this[selectedArray]
    this.saveForm('TO_DEFINE')
    this.isFormUpdated = true
    this.validationCheck()
  }

  // Get dropdown selection
  onDropdownSelect(selectedData: any): void {
    this.isFormUpdated = selectedData.updated
    if (selectedData) {
      switch (selectedData.controller) {
        case 'phase': {
          this.formData.phase = selectedData.val[0]?.id
          break
        }
        case 'signature': {
          this.formData.subjects = selectedData.val
          break
        }
        case 'modality': {
          this.formData.modality = selectedData.val[0]?.id
          break
        }
      }
    }
    this.activity.state = 'TO_DEFINE'
    this.validationCheck()
  }

  // Function to trigger the value in the textarea
  onTextAreaChange(value: FieldEvent, field: string): void {
    this.isFormUpdated = value.updated
    this.formData[field] = value.value
    this.activity.state = 'TO_DEFINE'
    this.validationCheck()
  }

  // Check whether two entities are equal or not
  checkUpdation(first: any, second: any): boolean {
    return JSON.stringify(first) === JSON.stringify(second) ? true : false
  }
  // Concatinate 2 arrays
  concatArrays(arr1: any, arr2: any): any[] {
    let array = []
    if (arr1) {
      arr1 = this.deepCopyArray(arr1)
      arr1.map((item) => {
        item.type = 'primary'
      })
      array = array.concat(arr1)
    }
    if (arr2) {
      arr2 = this.deepCopyArray(arr2)
      arr2.map((item) => {
        item.type = 'secondary'
      })
      array = array.concat(arr2)
    }
    return array
  }
  // Function to deep copy arrays
  deepCopyArray(arr: any): any {
    if (arr) {
      return JSON.parse(JSON.stringify(arr))
    } else {
      return []
    }
  }

  // Check for mandatory fields
  validationCheck(): void {
    if (
      !this.description ||
      !this.selectedStandards?.length ||
      !this.selectedObjectives?.length ||
      !this.phaseDropdown.selectedItems.length ||
      !this.modalityDropdown.selectedItems.length
    ) {
      this.activity.state = 'TO_DEFINE'
      this.isValid = false
    } else {
      this.isValid = true
    }
    this.setButtonStatus()
  }

  setButtonStatus(): void {
    if (this.activity.state === 'DEFINED') {
      if (this.isValid) {
        this.buttonDisabled = true
        this.buttonSubmitted = true
      } else {
        this.buttonDisabled = true
        this.buttonSubmitted = false
      }
    }
    if (this.activity.state === 'TO_DEFINE') {
      if (this.isValid) {
        this.buttonDisabled = false
        this.buttonSubmitted = false
      } else {
        this.buttonDisabled = true
        this.buttonSubmitted = false
      }
    }
  }

  // Save/Update the form
  saveForm(state: any, type: string = 'update'): void {
    if (state === 'DEFINED') {
      this.formData.state = 'DEFINED'
      this.activity.state = 'DEFINED'
      this.setButtonStatus()
    }
    this.formData.id = this.editor.activityId
    this.editor.handleActivitySubmit({
      ...this.formData,
      updateType: type,
    })
    this.isFormUpdated = false
  }
}
