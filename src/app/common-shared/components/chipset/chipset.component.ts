import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core'
import { validateEmailRegex } from '../../utility/form.utility'

@Component({
  selector: 'app-chipset',
  templateUrl: './chipset.component.html',
  styleUrls: ['./chipset.component.scss'],
})
export class ChipsetComponent implements OnInit {
  @Input() chips = []
  @Input() invalidChips = []
  @Input() label: string
  @Input() initFocus = true
  @Input() placeholder = ''
  @Input() variant = 'email'
  @Output() chipset = new EventEmitter()

  hasValue = false
  focus = false
  inputValue = ''
  @ViewChildren('input') input: QueryList<ElementRef>
  constructor() {}

  ngOnInit(): void {
    this.focusInput()
    this.chipset.emit(this.chips)
  }

  // focus the Input initially
  focusInput(): void {
    if (this.initFocus) {
      this.focus = true
      setTimeout(() => {
        this.input.first.nativeElement.focus()
      }, 0)
    }
  }

  removeChip(index: number): void {
    this.chips.splice(index, 1)
    if (!this.input.first.nativeElement.value) {
      this.chipset.emit(this.chips)
    }
  }

  handleKeyUp(event: any): void {
    const keyCode = event.keyCode
    const value = event.target.value
    const hasInutValue =
      (this.inputValue.length === 1 && keyCode !== 8) ||
      (this.inputValue.length === 1 && keyCode !== 46) ||
      !!this.inputValue
    this.hasValue = hasInutValue || !!this.chips.length
    if (value.trim()) {
      this.chipset.emit([])
    } else {
      this.chipset.emit(this.chips)
    }
  }

  handleKeyDown(event: any): void {
    const keyCode = event.keyCode
    const value = event.target.value
    if (
      keyCode === 13 ||
      keyCode === 186 ||
      keyCode === 32 ||
      keyCode === 188
    ) {
      event.preventDefault()
      const chip = value.trim()
      if (
        this.variant === 'email' &&
        validateEmailRegex(chip) &&
        !this.invalidChips.includes(chip)
      ) {
        event.target.value = ''
        this.chips.push(chip)
        this.chipset.emit(this.chips)
      }
    }
  }

  setInputFocus(): void {
    this.input.first.nativeElement.focus()
  }
}
