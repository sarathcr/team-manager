import { Component, Input, Output, EventEmitter, ViewChildren, QueryList, ElementRef, OnInit } from '@angular/core'
import { FieldConfig } from 'src/app/shared/constants/field.model'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit{

  @Input() placeholder: string
  @Input() maxlength: number
  @Input() value: string
  @Input() label: string
  @Input() onInitFocus: false
  @Output() inputChange = new EventEmitter()
  config: FieldConfig
  group: FormGroup
  focus = false
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
}
