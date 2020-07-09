import { Component, Input, Output, EventEmitter, ViewChildren, QueryList, ElementRef, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'

import { FieldConfig } from 'src/app/shared/constants/model/form-config.model'
import { ProjectTitle } from 'src/app/modules/project-editor/constants/model/project.model'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() placeholder = ''
  @Input() maxlength: number
  @Input() value: string
  @Input() label: string
  @Input() onInitFocus: false
  @Input() projectData: ProjectTitle
  @Output() inputChange = new EventEmitter()
  @Output() titleBlur = new EventEmitter()
  @Output() status = new EventEmitter()
  config: FieldConfig
  group: FormGroup
  focus = false
  tempTitle: string
  showInputfield = true
  error = false
  @ViewChildren('titleInput') titleInput: QueryList<ElementRef>

  constructor() { }

  ngOnInit(): void {
    this.focusInput()
  }

  // Function to get and emit value on textarea
  onValueChange(value: string): void {
    this.value = value
    this.inputChange.emit(value.trim())
  }

  setFocus(): void {
    this.focus = true
  }

  onBlur(): void {
    this.focus = false
    if (!this.value?.trim()) {
      this.value = ''
      this.inputChange.emit('')
    }
  }
  // focus the Input initially
  focusInput(): void {
    if (this.onInitFocus) {
      setTimeout(() => {
        this.titleInput.first.nativeElement.focus()
      }, 0)
    }
  }

}
