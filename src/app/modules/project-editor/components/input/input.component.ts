import { Component, Input, Output, EventEmitter, ViewChildren, QueryList, ElementRef, OnInit } from '@angular/core'
import { FieldConfig } from 'src/app/shared/constants/field.model'
import { FormGroup } from '@angular/forms'
import { ProjectTitle } from '../../constants/title-data.model'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit{

  @Input() placeholder = ''
  @Input() maxlength: number
  @Input() value: string
  @Input() label: string
  @Input() onInitFocus: false
  @Input() projectData: ProjectTitle
  @Output() inputChange = new EventEmitter()
  @Output() titleBlur = new EventEmitter()
  config: FieldConfig
  group: FormGroup
  focus = false
  tempTitle: string
  showInputfield = true
  @ViewChildren('titleInput') titleInput: QueryList<ElementRef>

  constructor() { }

  ngOnInit(): void {
    this.focusTextArea()
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
  // focus the text area initially
  focusTextArea(): void{
    if (this.onInitFocus){
      setTimeout(() => {
        this.titleInput.first.nativeElement.focus()
      }, 0)
    }
  }

  // Function to handle blur event of input field.
  handleBlur(value: string): void {
    this.tempTitle = value.trim()
    this.showInputfield = !this.tempTitle
    if ((this.tempTitle || this.projectData?.id)
      && (this.tempTitle !== this.projectData?.title)) { // check for same this.temptitle value
      this.titleBlur.emit({ title: this.tempTitle })
    }
  }
}
