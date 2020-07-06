import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  Input,
  ElementRef,
  Output,
  EventEmitter,
  AfterContentChecked,
  OnDestroy
} from '@angular/core'

import { Observable } from 'rxjs'

import { FieldConfig, Option, TextAreaVariants, TextareaSize } from 'src/app/shared/constants/field.model'
import { SubSink } from 'src/app/shared/utility/subsink.utility'

@Component({
  selector: 'app-textarea-bullets',
  templateUrl: './textarea-bullets.component.html',
  styleUrls: ['./textarea-bullets.component.scss']
})
export class TextareaBulletsComponent implements OnInit, AfterContentChecked, OnDestroy {

  @Input() variant: TextAreaVariants = 'bullet'
  @Input() size: TextareaSize
  @Input() config: FieldConfig
  @Input() options: Option[]
  @Input() onInitFocus = false
  @Input() label: string
  @Input() options$: Observable<Option[]>
  @Output() inputChange = new EventEmitter()
  @Output() textareaBlur = new EventEmitter()

  @ViewChildren('textArea') textArea: QueryList<ElementRef>
  index = 0
  initResize = false
  initialScrollHeight: number
  timeOut: any
  arrayHeight = ''
  sampleOption: Option = { id: null, name: null }
  configOptions: Option[] = []
  limit = 0
  focus = false
  subscriptions = new SubSink()

  constructor() { }

  ngOnInit(): void {
    this.limit = this.config.limit
    this.optionInit()
    this.focusTextArea()
  }

  ngAfterContentChecked(): void {
    if (this.textArea) {
      this.textArea.toArray().forEach(item => {
        item.nativeElement.style.height = (item.nativeElement.scrollHeight) + 'px'
      })
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  optionInit(): void {
    if (this.options$) {
      this.subscriptions.sink = this.options$.subscribe(data => {
        if (data?.length) {
          this.configOptions = data
        } else {
          this.configOptions = [{ ...this.sampleOption }]
        }
      })
    } else {
      this.configOptions = [{ ...this.sampleOption }]
    }
  }

  isFirefox(): boolean {
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
      return true
    }
    return false
  }

  keyAction(event: any, id: number): void {
    switch (event.keyCode) {
      case 13: // Enter
        event.preventDefault()
        if (this.config.limit === 0) {
          this.limit = this.configOptions.length + 1
        }
        if (this.configOptions.length < this.limit && this.configOptions[id].name?.trim()) {
          this.inputChange.emit([...this.configOptions])
          this.configOptions.splice(id + 1, 0, { ...this.sampleOption })  // add a new bullet
          this.timeOut = setTimeout(() => {
            this.textArea.toArray()[id + 1].nativeElement.focus()
          }, 0)
        }
        break

      case 46:  // delete
        event.preventDefault()
        if (this.configOptions.length > 1) {
          this.configOptions.splice(id, 1)
          this.index = this.textArea.toArray().length > id ? id : id - 1
          this.timeOut = setTimeout(() => {
            const textAreas = this.textArea.toArray()
            const index = textAreas.length > id ? id : id - 1
            textAreas[index].nativeElement.focus()
          }, 0)
        }
        else {
          this.configOptions[0].name = ''
        }
        if (this.configOptions.length === 1 && !this.configOptions[0].name) { this.inputChange.emit([]) }
        else { this.inputChange.emit([...this.configOptions]) }
        break

      case 32: // spacebar
        if (this.configOptions[id].name?.trim()?.length) {
          const textComponent = this.textArea.toArray()[id].nativeElement
          const startPos = textComponent.selectionStart
          const endPos = textComponent.selectionEnd
          const name = this.configOptions[id].name
          const stringLength = name?.length
          if (startPos !== endPos) {
            this.configOptions[id].name = (name.slice(0, startPos) + ' '
              + name.slice(endPos, stringLength)).trim() // splice the input text
            setTimeout(() => {
              textComponent.setSelectionRange(startPos + 1, startPos + 1) // shows the cursor after a space
            }, 0)
          }
          if (!this.configOptions[id].name) {
            if (this.configOptions.length > 1) {
              this.configOptions.splice(id, 1)
              if (id - 1 >= 0) {
                this.textArea.toArray()[id - 1].nativeElement.focus()
              } else {
                this.textArea.toArray()[id + 1].nativeElement.focus()
              }
            } else {
              if (!this.configOptions[id].name) {
                this.configOptions[0].name = ''
              }
            }
          }
        } else {
          this.configOptions[id].name = this.configOptions[id].name?.trim()
        }
        break

      case 8: // backspace
        if (!event.target.value && this.configOptions.length > 1) {
          this.configOptions.splice(id, 1)
          if (id - 1 >= 0) {
            this.textArea.toArray()[id - 1].nativeElement.focus()
            event.preventDefault()
          } else {
            this.textArea.toArray()[id + 1].nativeElement.focus()
            event.preventDefault()
          }
          clearTimeout(this.timeOut)
        }
        break

      default:
        break
    }
  }

  onValueChange(value: string, i: number): void {
    this.index = i
    if (this.isFirefox() && value.length > this.config.maxLength) {
      value = value.substring(0, this.config.maxLength)
    }
    this.configOptions[i].name = value
    let newConfigOptions = this.configOptions.filter(option => option.name?.trim() && option)
    if (this.configOptions.length === 1 && !this.configOptions[0].name.trim()) { newConfigOptions = [] }
    this.inputChange.emit(newConfigOptions)

  }

  setFocus(): void {
    this.focus = true
  }

  onBlur($event: any, i: number): void {
    if ($event.relatedTarget !== $event.target.parentElement) {
      this.focus = false
    }
    if (this.configOptions.length > 1 && !this.configOptions[i]?.name?.trim() &&
    $event.relatedTarget !== $event.target.parentElement) {
      this.configOptions.splice(i, 1)
    }
    if (this.configOptions.length === 1 && !this.configOptions[0]?.name?.trim()) {
      this.configOptions[0].name = null
    }
    this.textareaBlur.emit([...this.configOptions])
  }

  // focus the text area initially
  focusTextArea(): void{
    if (this.onInitFocus){
      setTimeout(() => {
        if (!this.textArea.first.nativeElement.value.length) {
          this.textArea.first.nativeElement.focus()
        }
      }, 0)
    }
  }

}


